### Tecnologias  

- [x] React (with Hooks)
- [x] Redux
- [x] Material UI
- [x] React-Select
- [x] Redux-Thunk
- [x] Recharts


### Arquitetura e Funcionalidades  

O sistema realiza requests para a api poloniex, por meio das actions 
utilizando redux-thunk, sendo assim foi possível realizar actions que 
retornam functions que disparam actions que atualizam a store.
O gráfico de moedas é atualizado de acordo com as moedas presentes na busca, 
a busca permite pesquisar multiplas moedas, sendo possível visualizar 
simultaneamente no gráfico os valores de cada moeda em um gráfico linear. 
Para essa funcionalidade, é disparado uma action a cada moeda que é 
adicionada na busca, e o gráfico é atualizado verificando as mudanças na 
store referente a busca. Ao clicar em uma moeda no gráfico, o card esquerdo 
vai ser atualizado com as informações detalhadas da moeda clicada, mas uma 
vez foi utilizado uma action para atualizar a store, e o card com detalhes 
da moedaverifica por atualizações na store.  


### Imagens  

![Chart](https://github.com/RonanFelipe/CryptoPrices/blob/master/src/images/Chart.PNG)   



![Search](https://github.com/RonanFelipe/CryptoPrices/blob/master/src/images/Search.PNG)  

#### Dificuldades  

O conhecimento da regra de negócio foi um fator limitante nas funcionalidades 
e exibição de dados, devido ao meu baixo conhecimento em crypto moedas e os 
seus dados e detalhes, não foi possível realizar uma exibição de dados que 
sejam interessantes para o usuário, poderia ter sido trabalhado de uma melhor 
forma o parâmetro para exibição e comparação.  


#### Como utilizar  
- git clone https://github.com/RonanFelipe/CryptoPrices.git
- npm install
- npm start
