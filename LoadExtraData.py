from Model import *
from Check import *
from bs4 import BeautifulSoup

def loadData():
	#resultDict, filesInFolder = checkAll()
	resultDict = readResult()
	filesInFolder = readFilesInFolder()
	for f in filesInFolder:		
		file = open(filesInFolder[f])
		text = file.read()
		file.close()	

		soup = BeautifulSoup(text)
		trList = soup.find_all('tr')	
		for tr in trList:		
			tdList = tr.find_all('td')
			patente = resultDict[f]				
			if(len(tdList) == 2):
				td0 =  tdList[0]
				td1 =  tdList[1]			
				if("Data da Publica" in str(td0)):						
					dataPublicacao = td1.font.text.strip()					
					if dataPublicacao == '-':
						patente.dataPublicacao = None
					else:
						patente.dataPublicacao = dataPublicacao					
				elif("Data da Concess" in str(td0)):					
					dataConcessao = td1.font.text.strip()					
					if dataConcessao == '-':
						patente.dataConcessao = None
					else:
						patente.dataConcessao = dataConcessao					
				elif("Nome do Inventor" in str(td0)):					
					nomeInventorList = td1.font.text.strip()					
					patente.nomeInventorList = nomeInventorList.split('/')	
					patente.stripNomeInventorList()									
				elif("Nome do Depositante" in str(td0)):					
					nomeDepositante = td1.font.text.strip()					
					patente.nomeDepositante = nomeDepositante
	return resultDict, filesInFolder									



def main():
	resultDict, filesInFolder = loadData()

	for key in resultDict:
		patente = resultDict[key]
		if  patente.universidadeBrasileira():
			print patente.titulo
	
	
				



if __name__ == "__main__":
    main()