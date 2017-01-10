from bs4 import BeautifulSoup
import codecs

class Patente:

	def __init__(self):
		self.link = None
		self.titulo = None
		self.dataDeposito = None
		self.ipc = None
		self.id = None

	def __str__(self):
		return self.id + " " + self.link + " " + self.dataDeposito + " " + self.titulo + " " + self.ipc


def findPatente(path):
	
	file = codecs.open(path, 'r', 'utf-8')
	text = file.read()
	file.close()	
	
	soup = BeautifulSoup(text)
	trList = soup.find_all('tr')	
	patenteList = {}

	for tr in trList:		
		tdList = tr.find_all('td')
		if len(tdList) == 4:
			patente = Patente()		
			count = 0	
			for td in tdList:
				if td.a:
					patente.link = td.a['href'] 
					patente.id = td.text.strip()
					patenteList[patente.id] = (patente)					
				if count == 1:
					patente.dataDeposito = td.font.text.strip()
				if count == 2:
					patente.titulo = td.font.text.strip()
				if count == 3:
					patente.ipc = td.font.text.strip() 

				count += 1
	return patenteList

def mergeDict(dict1, dict2):
	dictMerged = {}
	for key in dict1:
		if dictMerged.get(key) is None:
			dictMerged[key] = dict1[key]
	for key in dict2:
		if dictMerged.get(key) is None:
			dictMerged[key] = dict2[key]
	return dictMerged

#consultas feitas em 27/09/2015
def main():
	path = "SISTEMA_APRENDIZAGEM.html"
	patenteDict = findPatente(path)	
	print path, len(patenteDict)


	path2 = "SISTEMA_ENSINO.html"
	patenteDict2 = findPatente(path2)
	print path2, len(patenteDict2)

	path3 = "SISTEMAS_ENSINO.html"
	patenteDict3 = findPatente(path3)
	print path3, len(patenteDict3)

	path4 = "SISTEMAS_APRENDIZAGEM.html"
	patenteDict4 = findPatente(path4)
	print path4, len(patenteDict4)

	path5 = "AMBIENTE_APRENDIZAGEM.html"
	patenteDict5 = findPatente(path5)
	print path5, len(patenteDict5)

	path6 = "AMBIENTES_APRENDIZAGEM.html"
	patenteDict6 = findPatente(path6)
	print path6, len(patenteDict6)

	path7 = "AMBIENTE_ENSINO.html"
	patenteDict7 = findPatente(path7)
	print path7, len(patenteDict7)

	path8 = "AMBIENTES_ENSINO.html"
	patenteDict8 = findPatente(path8)
	print path8, len(patenteDict8)

	path9 = "TECNOLOGIA_ENSINO.html"
	patenteDict9 = findPatente(path9)
	print path9, len(patenteDict9)

	path10 = "TECNOLOGIAS_ENSINO.html"
	patenteDict10 = findPatente(path10)
	print path10, len(patenteDict10)

	dictMerged = mergeDict(patenteDict, patenteDict2)
	dictMerged = mergeDict(dictMerged, patenteDict3)
	dictMerged = mergeDict(dictMerged, patenteDict4)
	dictMerged = mergeDict(dictMerged, patenteDict5)
	dictMerged = mergeDict(dictMerged, patenteDict6)
	dictMerged = mergeDict(dictMerged, patenteDict7)
	dictMerged = mergeDict(dictMerged, patenteDict8)
	dictMerged = mergeDict(dictMerged, patenteDict9)
	dictMerged = mergeDict(dictMerged, patenteDict10)

	f = codecs.open('result','w', 'utf-8')
	f.write("identificador;link;data deposito;titulo;icp\n")
	for id in dictMerged:
		patente = dictMerged[id]
		f.write(patente.id + ";" + patente.link + ";" + patente.dataDeposito + ";" + patente.titulo + ";" + patente.ipc + "\n")
	
		
	f.close() 

	print '--------------'
	print 'Soma com repeticoes', len(patenteDict) + len(patenteDict2) + len(patenteDict3) + len(patenteDict4) + len(patenteDict5) + len(patenteDict6) + len(patenteDict7) + len(patenteDict8) + len(patenteDict9) + len(patenteDict10)
	print 'Total sem repeticoes', len(dictMerged)
	print 'tecnologia(s) aprendizagem nada foi encontrado'
	


if __name__ == '__main__':	
	main()