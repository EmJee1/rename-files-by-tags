import mm from 'music-metadata'
import path from 'path'
import fs from 'fs'

import { parseNewFileName } from '../utils/utils.js'

const FILES_DIR = 'F:\\Music\\K-pop'

const renameFile = async filePath => {
	if (!['.wav', '.mp3'].includes(path.extname(filePath))) {
		console.error(
			`We currently only support .mp3 and .wav files, we skipped ${path.basename(
				filePath
			)}`
		)
		return
	}

	try {
		const common = (await mm.parseFile(filePath)).common

		const newPath = path.join(
			path.dirname(filePath),
			parseNewFileName(common, path.extname(filePath))
		)

		fs.renameSync(filePath, newPath)
	} catch (err) {
		console.error(err)
	}
}

const scanFileDir = dir => {
	fs.readdirSync(dir).forEach(file => {
		if (!fs.lstatSync(path.join(dir, file)).isDirectory()) {
			renameFile(path.join(dir, file))
		} else {
			scanFileDir(path.join(dir, file))
		}
	})
}

scanFileDir(FILES_DIR)