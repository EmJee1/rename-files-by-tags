import mm from 'music-metadata'
import path from 'path'
import fs from 'fs'

import { parseNewFileLocation } from '../utils/utils.js'

const FILES_DIR = 'F:\\Music\\K-pop'

const moveFile = async filePath => {
	try {
		const common = (await mm.parseFile(filePath)).common

		const newFolderName = parseNewFileLocation(common)

		const newFolderPath = path.join(FILES_DIR, newFolderName)
		const newFilePath = path.join(newFolderPath, path.basename(filePath))

		if (!fs.existsSync(newFolderPath)) {
			console.log(`Creating folder "${newFolderName}"`)
			fs.mkdirSync(newFolderPath)
		}

		fs.renameSync(filePath, newFilePath)
	} catch (err) {
		console.error(err)
	}
}

const scanFileDir = dir => {
	fs.readdirSync(dir).forEach(file => {
		if (!fs.lstatSync(path.join(dir, file)).isDirectory()) {
			moveFile(path.join(dir, file))
		} else {
			scanFileDir(path.join(dir, file))
		}
	})
}

scanFileDir(FILES_DIR)