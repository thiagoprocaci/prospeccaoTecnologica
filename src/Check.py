from os import listdir
from os.path import isfile, join
from bs4 import BeautifulSoup
from Model import *
import collections



def readResult():
	fileResult = open('result')
	text = fileResult.read()
	resultDict = {}
	count = 0
	for line in text.split('\n'):
		if line and count > 0:
			lineArray = line.split(';')
			numero = lineArray[0].strip()
			url = lineArray[1].strip()
			dataDeposito = lineArray[2].strip()
			titulo = lineArray[3].strip()
			ipc = lineArray[4].strip()
			
			patente = Patente()
			patente.link = url
			patente.dataDeposito = dataDeposito
			patente.titulo = titulo
			patente.ipc = ipc
			patente.id = numero
			
			resultDict[numero] = patente
		count += 1
	return resultDict

def readFilesInFolder():
	folder = 'inpi'	
	filesInFolder = [ f for f in listdir(folder) if isfile(join(folder,f)) ]
	filesDict = {}
	for f in filesInFolder:
		name = f.split('.')[0].strip()
		filesDict[name] = join(folder,f)
	return filesDict

def checkDownload():
	resultDict = readResult()
	filesInFolder = readFilesInFolder()

	ok = True
	for key in resultDict:
		if(filesInFolder.get(key) is None):
			print 'problema: ' + key + ' do arquivo result nao existe na pasta inpi'
			ok = False

	if len(resultDict) != len(filesInFolder):
		print 'problema len(resultDict) != len(filesInFolder)', len(resultDict), '!=' , len(filesInFolder) 
		ok = False

	if ok:
		return resultDict, filesInFolder
	return None, None

def checkDataDeposito():
	folder = 'inpi'
	resultDict, filesInFolder = checkDownload()
	ok = True

	for f in filesInFolder:		
		file = open(filesInFolder[f])
		text = file.read()
		file.close()	

		soup = BeautifulSoup(text)
		trList = soup.find_all('tr')	
		for tr in trList:		
			tdList = tr.find_all('td')
			if(len(tdList) == 3):
				td0 =  tdList[0]
				if("Data do Dep" in str(td0)):
					td1 =  tdList[1]			
					dataDeposito = td1.font.text.strip()
					patente = resultDict[f]
					if patente.dataDeposito != dataDeposito:
						print 'problemas em ' + f + '. A data de deposito nao bate:' + dataDeposito
						ok = False


	if ok:
		return resultDict, filesInFolder
	return None, None	
	
def checkAll():
	print 'Iniciando verificacao dos dados'
	resultDict, filesInFolder = checkDataDeposito()
	if resultDict is None or filesInFolder is None:
		print 'Ocorrem problemas na verificacao'
	print 'Fim da verificacao'
	return resultDict, filesInFolder


def main():
	checkAll()	


if __name__ == "__main__":
    main()