from Model import *
from Check import *
import codecs
import os

def main():
	filesInFolder = readFilesInFolder()
	for f in filesInFolder:
		BLOCKSIZE = 1048576 # or some other, desired size in bytes
		with codecs.open(filesInFolder[f], "r") as sourceFile:
			
			fileName = filesInFolder[f].split('\\')[1]
			#print fileName
		    with codecs.open('inpi-utf8' + os.sep + fileName, "w", "utf-8") as targetFile:
		        while True:
		            contents = sourceFile.read(BLOCKSIZE)
		            if not contents:
		                break
		            targetFile.write(contents)
		
				



if __name__ == "__main__":
    main()