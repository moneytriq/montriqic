'use client'
import React from 'react'

export default function PageInt() {
  return (
    <div style={{marginTop: "5rem"}}>
    <h1>test</h1>
     <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          alert(
            e.target.files && e.target.files.length
              ? "FILE SELECTED"
              : "NO FILE"
          );
          console.log(e.target.files);
        }}
      />
    </div>
  )
}
