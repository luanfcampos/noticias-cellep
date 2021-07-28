// Importando o express
const express = require('express')

const db= require('./dbconection')

//instalamos o express
//intalamos o nodemon
//instalar EJS

// Criando um objeto express na variável app
const app = express()

//informando pro express que estamos utilizando EJS para vizualicao da pagiga.
app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Criando nossa primeira rota
app.get('/', async (req, res) => {

    var result = await db.query('select * from noticias order by id_noticias desc limit 3')
    res.render("home/index", {noticias: result.rows})
})

app.get('/noticias', async (req, res) => {

    var result = await db.query('select * from noticias order by id_noticias desc')

    res.render("noticia/noticias",{noticias:result.rows})
})

app.get('/noticia', async (req, res) => {
    
    var id= req.query.id

    var result = await db.query('select * from noticias where id_noticias= $1',[id])

    res.render("noticia/noticia", {noticia: result.rows[0]})
})

app.get('/admin', (req, res) => {
    res.render("admin/form_add_noticia")
})

app.post('/admin/salvar-noticia', async(req,res)=>{
    let{titulo,noticia}= req.body

    await db.query('INSERT INTO noticias(titulo,noticia) values($1,$2)',[titulo,noticia],(err, result)=>{
        res.redirect('/noticias')
    })
})


// Iniciando o servidor na porta 3000
app.listen(process.env.PRT || 3000, ( ) => {
    console.log('Escutando na porta 3000 com Express')
    console.log('Pressione CTRL+C para encerrar o servidor')
})

