export const removeIllegalChars = str => {
	if (!str) return 'unknown'
	const parsed = str
		.toString()
		.replace(/[/\\?%*:|"<>]/g, '')
		.trim()
	if (!parsed) return 'unknown'
	return parsed
}

export const parseNewFileName = (common, ext) => {
	let trackNumber = common.track.no ?? 0
	trackNumber = trackNumber < 10 ? `0${common.track.no}` : common.track.no

	return removeIllegalChars(
		`${removeIllegalChars(trackNumber)} - ${removeIllegalChars(
			common.title
		)} - ${removeIllegalChars(common.artist)}${ext}`
	)
}

export const parseNewFileLocation = common => {
	const artist = removeIllegalChars(common.artist)
	const album = removeIllegalChars(common.album)
	return artist + ' - ' + album
}