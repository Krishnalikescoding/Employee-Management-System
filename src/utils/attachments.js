const IMAGE_EXT = /\.(png|jpe?g|gif|webp|bmp|svg)$/i

export const getAttachmentUrl = (file, apiBase) => {
  if (file.fileUrl) return file.fileUrl
  if (file.filePath) return `${apiBase}${file.filePath}`
  return ''
}

export const isImageAttachment = (file) => {
  if (file.fileType === 'link') return false
  if (file.fileType?.startsWith('image/')) return true
  const name = file.fileName || ''
  const path = file.filePath || file.fileUrl || ''
  return IMAGE_EXT.test(name) || IMAGE_EXT.test(path)
}
