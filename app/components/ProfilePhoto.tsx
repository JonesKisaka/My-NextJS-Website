'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ProfilePhoto() {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Show initials by default, or when image fails to load
  if (!imageLoaded || imageError) {
    return (
      <div className="profile-photo-container">
        <div className="profile-photo">
          <div className="profile-fallback">
            JK
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-photo-container">
      <div className="profile-photo">
        <Image
          src="/profile-photo.jpg"
          alt="Jones Kisaka"
          width={300}
          height={300}
          className="profile-image"
          priority
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      </div>
    </div>
  )
} 