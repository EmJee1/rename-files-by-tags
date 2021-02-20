import path from 'path'
import fs from 'fs'

const FILES_DIR = 'F:\\Music\\K-pop'

const moveFileUp = async filePath => {
	try {
		const newPath = path.join(FILES_DIR, path.basename(filePath))
		fs.renameSync(filePath, newPath)
	} catch (err) {
		console.error(err)
	}
}

const scanFileDir = dir => {
	fs.readdirSync(dir).forEach(file => {
		const filePath = path.join(dir, file)
		if (!fs.lstatSync(filePath).isDirectory()) {
			moveFileUp(filePath)
		} else {
			scanFileDir(filePath)
		}
	})
}

scanFileDir(FILES_DIR)