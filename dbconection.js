const {Pool} = require('pg')

const client = new Pool({
    connectionString: process.env.DATABASE_URL ||'postgres://xsrtekcbaxgwod:24a6b398478757ff8223afc4e60e898c38d71f3f06e4db05e4be89b8d5c72f64@ec2-52-1-20-236.compute-1.amazonaws.com:5432/d3mlsolfgpc2je',

    ssl:{
        rejectUnauthorized: false
    }
})

//teste

// async function connectTest(){
//     const res = await client.query('SELECT $1:: text as message', ['Hello World'], (err, result) => {
//         console.log(result.rows[0].message)
//     })
// }

// connectTest()

module.exports = client