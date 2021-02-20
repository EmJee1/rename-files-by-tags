import path from 'path'
import fs from 'fs'

const FILES_DIR = 'F:\\Music\\K-pop'

const removeDirectory = async filePath => {
	try {
		fs.rmdirSync(filePath)
	} catch (err) {
		if (err.code === 'ENOTEMPTY') {
			console.log(`The following directory is not empty: ${err.path}`)
		} else console.error(err)
	}
}

const scanFileDir = dir => {
	fs.readdirSync(dir).forEach(file => {
		const filePath = path.join(dir, file)
		if (fs.lstatSync(filePath).isDirectory()) {
			removeDirectory(filePath)
		}
	})
}

scanFileDir(FILES_DIR)