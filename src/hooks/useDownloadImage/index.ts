import { useState } from 'react'
import html2canvas from 'html2canvas'

const useDownloadImage = () => {
  const [loading, setLoading] = useState(false)

  const downloadImage = (blob: string, fileName: string) => {
    const fakeLink = window.document.createElement('a')
    fakeLink.style.display = 'none'
    fakeLink.download = fileName

    fakeLink.href = blob

    document.body.appendChild(fakeLink)
    fakeLink.click()
    document.body.removeChild(fakeLink)

    fakeLink.remove()
  }

  const startDownload = () => {
    setLoading(true)
  }

  const finishDownload = () => {
    setLoading(false)
  }

  const download = (element: HTMLElement, imageFileName: string) => {
    startDownload()
    html2canvas(element, { scale: 10 })
      .then(canvas => {
        const image = canvas.toDataURL('image/png', 10.0)
        downloadImage(image, imageFileName)
        finishDownload()
      })
      .catch(() => {
        finishDownload()
      })
  }

  return { download, loading }
}

export { useDownloadImage }
