import express, { response } from 'express';
// import { request } from 'http';
import mustache from 'mustache-express';
import path from 'path';
import url from 'url';

/* Configure file and work directory */
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Configure server parameters */
const app = express();
const addr = "127.0.0.1";
const port = 8080;
const db = { voting: []};

/* Configure Mustache */
app.engine("html", mustache());
app.set('view engine', 'html');
app.set('__views', __dirname + "/views");

/* Configure static server files    */
/* Include files from folder public */
app.use(express.static("public"));

//app.use(express.urlencoded());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/* Populate database */
db.voting = [
    { name: "Tiger", imgRef: "tiger.jpg", id: "1"},
    { name: "Lejon", imgRef: "lejon.jpg", id: "2"},
    { name: "Gepard", imgRef: "gepard.jpg", id: "3"},
    { name: "Puma", imgRef: "puma.jpg", id: "4"},
    { name: "Lodjur", imgRef: "lodjur.jpg", id: "5"},
    { name: "Leopard", imgRef: "leopard.jpg", id: "6"},
];

/* Create helper functions */
const randomIndex = (list) => Math.floor(Math.random() * list.length);

function incrementScore(chosenPic) {

    if (chosenPic.score == undefined) {
        chosenPic.score = 0;
    }

    chosenPic.score++; 
}

/* Create endpoint - server routing */
app.get("/voting", (request, response) => {

    const votingPair = [
        db.voting[randomIndex(db.voting)],
        db.voting[randomIndex(db.voting)]
    ]

    response.render("voting", { voting: votingPair });
});

app.post("/vote", (request, response) => {
    const votedId = request.body.numberId;
    const chosenPic = db.voting.find(chosenPic => chosenPic.id == votedId);

    incrementScore(chosenPic);

    // setTimeout(() => response.redirect("/voting"), 2000);

    response.redirect("/voting");

});

/* Create endpoint - server routing */
app.get("/scoreboard", (request, response) => {

    response.render("scoreboard", { voting: db.voting });

});

/* Start the server */
app.listen(port, addr, () => {
    console.log(`Server started on address ${addr}`);
    console.log(`Listening on port ${port}`);
});