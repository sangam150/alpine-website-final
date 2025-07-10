'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const galleryPhotos = [
  {
    id: 1,
    src: '/icons/icon-192x192.png',
    alt: 'Student success celebration',
    title: 'Priya\'s Success Story',
    description: 'Accepted to University of Melbourne with 50% scholarship',
    category: 'Success Stories',
    likes: 156,
    shares: 23
  },
  {
    id: 2,
    src: '/icons/icon-192x192.png',
    alt: 'Campus tour at University of Toronto',
    title: 'Campus Tour - UofT',
    description: 'Our students exploring the beautiful campus of University of Toronto',
    category: 'Campus Visits',
    likes: 234,
    shares: 45
  },
  {
    id: 3,
    src: '/icons/icon-192x192.png',
    alt: 'IELTS preparation class',
    title: 'IELTS Preparation',
    description: 'Students practicing for their IELTS exam with our expert trainers',
    category: 'Test Preparation',
    likes: 189,
    shares: 31
  },
  {
    id: 4,
    src: '/icons/icon-192x192.png',
    alt: 'Visa success celebration',
    title: 'Visa Success Party',
    description: 'Celebrating another successful visa approval for our students',
    category: 'Success Stories',
    likes: 298,
    shares: 67
  },
  {
    id: 5,
    src: '/icons/icon-192x192.png',
    alt: 'University application workshop',
    title: 'Application Workshop',
    description: 'Students learning the ins and outs of university applications',
    category: 'Workshops',
    likes: 145,
    shares: 28
  },
  {
    id: 6,
    src: '/icons/icon-192x192.png',
    alt: 'Study abroad consultation',
    title: 'Free Consultation',
    description: 'One-on-one counseling sessions with our expert advisors',
    category: 'Consultations',
    likes: 267,
    shares: 52
  },
  {
    id: 7,
    src: '/icons/icon-192x192.png',
    alt: 'Mock test session',
    title: 'Mock Test Session',
    description: 'Students taking practice tests under real exam conditions',
    category: 'Test Preparation',
    likes: 178,
    shares: 34
  },
  {
    id: 8,
    src: '/icons/icon-192x192.png',
    alt: 'Graduation celebration',
    title: 'Graduation Day',
    description: 'Celebrating our students\' graduation from international universities',
    category: 'Success Stories',
    likes: 345,
    shares: 89
  }
]

const categories = ['All', 'Success Stories', 'Campus Visits', 'Test Preparation', 'Workshops', 'Consultations']

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(0)

  const filteredPhotos = selectedCategory === 'All' 
    ? galleryPhotos 
    : galleryPhotos.filter(photo => photo.category === selectedCategory)

  const openLightbox = (index: number) => {
    setCurrentPhoto(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % filteredPhotos.length)
  }

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)
  }

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our journey through photos - from student success stories to campus visits and workshops.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full px-6 py-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div 
              key={photo.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative">
                <img 
                  src={photo.src} 
                  alt={photo.alt} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                    <div className="text-lg font-semibold mb-2">{photo.title}</div>
                    <div className="text-sm">{photo.description}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {photo.category}
                  </span>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {photo.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" />
                      {photo.shares}
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{photo.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={prevPhoto}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={nextPhoto}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>

              {/* Photo Content */}
              <div className="text-center">
                <img 
                  src={filteredPhotos[currentPhoto].src} 
                  alt={filteredPhotos[currentPhoto].alt} 
                  className="max-h-[70vh] mx-auto rounded-lg"
                />
                <div className="mt-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">{filteredPhotos[currentPhoto].title}</h3>
                  <p className="text-gray-300">{filteredPhotos[currentPhoto].description}</p>
                </div>
              </div>

              {/* Photo Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                {currentPhoto + 1} of {filteredPhotos.length}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <Button 
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3"
          >
            <a href="https://calendly.com/alpine-education/consultation" target="_blank" rel="noopener">
              Book Free Consultation
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
} 