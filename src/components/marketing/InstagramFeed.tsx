'use client'

import { Heart, MessageCircle, Share2, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'

const instagramPosts = [
  {
    id: 1,
    image: '/icons/icon-192x192.png',
    caption: 'Student success story! 🎓 Priya got accepted to University of Melbourne with a 50% scholarship! #StudyAbroad #Australia #Success',
    likes: 234,
    comments: 18,
    shares: 5,
    isVideo: false,
    isSponsored: false
  },
  {
    id: 2,
    image: '/icons/icon-192x192.png',
    caption: 'IELTS tips that actually work! 📚 Our students improved their scores by 1-2 bands using these techniques. DM for free study materials!',
    likes: 189,
    comments: 23,
    shares: 12,
    isVideo: true,
    isSponsored: false
  },
  {
    id: 3,
    image: '/icons/icon-192x192.png',
    caption: 'UK Student Visa Workshop this Saturday! 🇬🇧 Learn everything about Tier 4 visa requirements. Limited seats available. Link in bio!',
    likes: 156,
    comments: 31,
    shares: 8,
    isVideo: false,
    isSponsored: true
  },
  {
    id: 4,
    image: '/icons/icon-192x192.png',
    caption: 'Campus tour at University of Toronto! 🍁 Our students exploring one of Canada\'s top universities. Dream big, study abroad!',
    likes: 298,
    comments: 42,
    shares: 15,
    isVideo: false,
    isSponsored: false
  },
  {
    id: 5,
    image: '/icons/icon-192x192.png',
    caption: 'Free mock test this weekend! 🎯 Practice IELTS/PTE with real exam conditions. Register now - link in bio! #MockTest #IELTS #PTE',
    likes: 267,
    comments: 35,
    shares: 9,
    isVideo: false,
    isSponsored: false
  },
  {
    id: 6,
    image: '/icons/icon-192x192.png',
    caption: 'Germany study opportunities! 🇩🇪 Engineering, Business, Arts - find your perfect program. Free counseling available!',
    likes: 145,
    comments: 19,
    shares: 6,
    isVideo: false,
    isSponsored: false
  }
]

export default function InstagramFeed() {
  const handlePostClick = (postId: number) => {
    // In a real app, this would open the Instagram post
    console.log('Opening Instagram post:', postId)
  }

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-pink-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Follow Our Journey
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get real-time updates, student success stories, study tips, and behind-the-scenes content from our Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instagramPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              onClick={() => handlePostClick(post.id)}
            >
              {/* Post Image */}
              <div className="relative">
                <img 
                  src={post.image} 
                  alt="Instagram post" 
                  className="w-full h-64 object-cover"
                />
                {post.isVideo && (
                  <div className="absolute top-3 right-3 bg-black/50 rounded-full p-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  </div>
                )}
                {post.isSponsored && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Sponsored
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {post.caption}
                </p>

                {/* Engagement Metrics */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-4 h-4 text-green-500" />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">2h ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            asChild
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-8 py-3"
          >
            <a href="https://instagram.com/alpine_education" target="_blank" rel="noopener">
              <Instagram className="w-5 h-5 mr-2" />
              Follow on Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
} 