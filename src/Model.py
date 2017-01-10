class Patente:

	def __init__(self):
		self.link = None
		self.titulo = None
		self.dataDeposito = None
		self.ipc = None
		self.id = None
		self.dataPublicacao = None
		self.dataConcessao = None
		self.nomeInventorList = None
		self.nomeDepositante = None

	def nomeInventorListAsString(self):
		nome = ''
		if self.nomeInventorList:
			for nomeInventor in self.nomeInventorList:
				nome = nome + nomeInventor + ','
			nome = nome[:-1]
		return nome

			



	def stripNomeInventorList(self):
		if(self.nomeInventorList is not None):
			auxList = []
			for nomeInventor in self.nomeInventorList:
				nomeInventor = nomeInventor.replace('\n','')
				nomeInventor = nomeInventor.strip()
				auxList.append(nomeInventor)
			self.nomeInventorList = auxList

	def brasileira(self):
		if self.nomeDepositante:
			if "(BR" in self.nomeDepositante.upper():
				return True
		return False

	def universidadeBrasileira(self):
		if self.nomeDepositante:
			if "UNIVERSIDADE" in self.nomeDepositante.upper() or "FACULDADE" in self.nomeDepositante.upper() or "CNPQ" in self.nomeDepositante.upper() or "FEDERAL" in self.nomeDepositante.upper() or "ESTADUAL" in self.nomeDepositante.upper():
				return True
		return False

	def depois2000(self):
		ano = self.anoDeposito()
		return ano >= 2000

	def anoDeposito(self):
		return int(self.dataDeposito.split('/')[2])

