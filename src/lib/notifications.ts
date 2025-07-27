import { getFirestoreSafe } from "./firebase-config";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { sendTransactionalEmail } from "./resend";

export interface NotificationData {
  userId?: string;
  email: string;
  title: string;
  message: string;
  type: "document_approval" | "status_change" | "quiz_result" | "webinar" | "general";
  data?: any;
  timestamp: string;
}

export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: any;
}

class NotificationService {
  private db = getFirestoreSafe();

  async sendNotification(notification: NotificationData) {
    try {
      // Log to Firestore
      await addDoc(collection(this.db, "notifications"), {
        ...notification,
        timestamp: new Date().toISOString(),
        read: false
      });

      // Send email notification
      await this.sendEmailNotification(notification);

      // Send push notification (if user has opted in)
      await this.sendPushNotification(notification);

      return { success: true };
    } catch (error) {
      console.error("Error sending notification:", error);
      return { success: false, error };
    }
  }

  private async sendEmailNotification(notification: NotificationData) {
    const emailTemplates = {
      document_approval: {
        subject: "Document Approved - Alpine Education",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Document Approved</h2>
            <p>${notification.message}</p>
            <p><strong>Document:</strong> ${notification.data?.documentName || "Document"}</p>
            <p>Thank you for using Alpine Education!</p>
          </div>
        `
      },
      status_change: {
        subject: "Application Status Updated - Alpine Education",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Application Status Updated</h2>
            <p>${notification.message}</p>
            <p><strong>New Status:</strong> ${notification.data?.newStatus || "Updated"}</p>
            <p>Check your student portal for more details.</p>
          </div>
        `
      },
      quiz_result: {
        subject: "Quiz Results Ready - Alpine Education",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Quiz Results Ready</h2>
            <p>${notification.message}</p>
            <p><strong>Quiz Type:</strong> ${notification.data?.quizType || "Quiz"}</p>
            <p>Log in to your student portal to view your results.</p>
          </div>
        `
      },
      webinar: {
        subject: "Upcoming Webinar Reminder - Alpine Education",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Webinar Reminder</h2>
            <p>${notification.message}</p>
            <p><strong>Webinar Date:</strong> ${notification.data?.webinarDate || "Upcoming"}</p>
            <p>Don't miss this opportunity to learn more!</p>
          </div>
        `
      },
      general: {
        subject: notification.title,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">${notification.title}</h2>
            <p>${notification.message}</p>
          </div>
        `
      }
    };

    const template = emailTemplates[notification.type] || emailTemplates.general;

    await sendTransactionalEmail({
      to: notification.email,
      subject: template.subject,
      html: template.html
    });
  }

  private async sendPushNotification(notification: NotificationData) {
    // Check if user has push notifications enabled
    if (notification.userId) {
      const userPrefs = await this.getUserNotificationPreferences(notification.userId);
      
      if (userPrefs?.pushEnabled) {
        // Send to Firebase Cloud Messaging
        await this.sendToFCM(notification);
      }
    }
  }

  private async sendToFCM(notification: NotificationData) {
    try {
      // This would integrate with Firebase Cloud Messaging
      // For now, we'll log the notification
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  }

  private async getUserNotificationPreferences(userId: string) {
    try {
      const prefsQuery = query(
        collection(this.db, "userPreferences"),
        where("userId", "==", userId)
      );
      const prefsSnapshot = await getDocs(prefsQuery);
      
      if (!prefsSnapshot.empty) {
        return prefsSnapshot.docs[0].data();
      }
      
      return null;
    } catch (error) {
      console.error("Error getting user preferences:", error);
      return null;
    }
  }

  // Convenience methods for different notification types
  async sendDocumentApprovalNotification(userId: string, email: string, documentName: string) {
    return this.sendNotification({
      userId,
      email,
      title: "Document Approved",
      message: `Your ${documentName} has been approved by our team.`,
      type: "document_approval",
      data: { documentName },
      timestamp: new Date().toISOString()
    });
  }

  async sendStatusChangeNotification(userId: string, email: string, newStatus: string) {
    return this.sendNotification({
      userId,
      email,
      title: "Application Status Updated",
      message: `Your application status has been updated to: ${newStatus}`,
      type: "status_change",
      data: { newStatus },
      timestamp: new Date().toISOString()
    });
  }

  async sendQuizResultNotification(userId: string, email: string, quizType: string) {
    return this.sendNotification({
      userId,
      email,
      title: "Quiz Results Ready",
      message: `Your ${quizType} results are ready. Check your student portal for details.`,
      type: "quiz_result",
      data: { quizType },
      timestamp: new Date().toISOString()
    });
  }

  async sendWebinarReminderNotification(userId: string, email: string, webinarTitle: string, webinarDate: string) {
    return this.sendNotification({
      userId,
      email,
      title: "Webinar Reminder",
      message: `Reminder: ${webinarTitle} is scheduled for ${webinarDate}`,
      type: "webinar",
      data: { webinarTitle, webinarDate },
      timestamp: new Date().toISOString()
    });
  }

  async sendBatchNotification(emails: string[], title: string, message: string) {
    const promises = emails.map(email => 
      this.sendNotification({
        email,
        title,
        message,
        type: "general",
        timestamp: new Date().toISOString()
      })
    );
    
    return Promise.all(promises);
  }
}

export const notificationService = new NotificationService(); 