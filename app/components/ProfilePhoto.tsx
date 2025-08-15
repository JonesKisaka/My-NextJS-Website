'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ProfilePhoto() {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="profile-photo-container">
      <div className="profile-photo">
        {imageError ? (
          <div className="profile-fallback">
            JK
          </div>
        ) : (
          <Image
            src="/jones-kisaka-photo.png"
            alt="Jones Kisaka"
            width={350}
            height={350}
            className="profile-image"
            priority
            onError={() => setImageError(true)}
            onLoad={() => {
              setImageLoaded(true)
              setImageError(false)
            }}
            unoptimized
          />
        )}
      </div>
    </div>
  )
} 