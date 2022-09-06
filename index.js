const express = require('express')
//as i want to read one time from this file so i wont use fs.readfile
const file = require('./TestData.json')
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
app.use(express.json())
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
  origin: '*'
}));

/*
Get10Words Logic
 1)we loop on the arr variable that when returned should contain the needed words so if it reaches length of 10 then we stop 
 2)in the loop first we get a random word from the WorListHelper which is a clone of the WordList 
 3)After getting the random number we have 3 steps
   a)pop the choosen word from the WordListHelpr in order to provide unieque words and decrease the uncertanity of the math.random function
   b)check the posObj which is an object that store a unique category when found (verb,noun,adj,adv) 
   we check in the word.pos if this category doesnt exist in the object then we add it 
   we do that in order to be sure when we finish that we have the 4 categories 
  4)As we should have 4 categories in the first 6 atleast on of the category is choosen but starting from 7 we need to makse 
  sure that all the categoreis exist so we add the condition of length 7 and then we add what is left  
  
  5)the code seems bigger than it should be as there is ways much cleaner but using this way we will make sure that 
   the choices are uncertain where if i added the first 4 as a unique category then started generating randoms for the next 6
   there will be a pattern as the fist 4 are always different the  student will techincaly know the answer of the third one
   so my main focus was unpredictablity
 */



function HandleRem(wordListHelper, arr, key) {
  let Filling = wordListHelper.filter((item) => item.pos == key)
  if (Filling.length !== 0) {
    let word = Filling[Math.floor(Math.random() * Filling.length)]
    let indexToRemove = wordListHelper.indexOf(word);
    wordListHelper.splice(indexToRemove, 1);
    arr.push(word)

  }

}

function get10Words(quantity) {
  const { wordList } = file
  const wordListHelper = [...wordList];

  const posObj = {};
  const arr = []
  while (arr.length < quantity) {

    let word = wordListHelper[Math.floor(Math.random() * wordListHelper.length)]
    let indexToRemove = wordListHelper.indexOf(word);
    wordListHelper.splice(indexToRemove, 1);

    if (!posObj[word.pos]) {
      posObj[word.pos] = 1
    }
    arr.push(word)



    if (arr.length === 7) {
      if (Object.keys(posObj).length !== 4) {


        if (!posObj['adjective']) {

          HandleRem(wordListHelper, arr, 'adjective')


        }
        if (!posObj['noun']) {

          HandleRem(wordListHelper, arr, 'noun')



        }
        if (!posObj['verb']) {

          HandleRem(wordListHelper, arr, 'verb')



        }
        if (!posObj['adverb']) {

          HandleRem(wordListHelper, arr, 'adverb')


        }



      }
    }

  }
  return (arr)
}




app.get("/", (req, res) => {

  res.send(get10Words(10))

})


app.post("/Rank", (req, res) => {

  const { scoresList } = file;
  let score = req.body.score;
  let counter = 0;
  for (let i = 0; i < scoresList.length; i++) {
    if (scoresList[i] < score) {
      counter++;
    }
  }
  let rank = Math.round(100 * (counter * 100) / scoresList.length) / 100;

  res.send(rank + "")



})

app.listen(PORT, () => {
  console.log("Server is Running")
})