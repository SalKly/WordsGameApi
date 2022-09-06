const express = require('express')
//as i want to read one time from this file so i wont use fs.readfile
const file = require('./TestData.json')
const app = express();
app.use(express.json())








function get10Words(quantity) {
  const { wordList } = file
  const wordListHelper = [...wordList];

  const posArray = {};
  const arr = []
  while (arr.length < quantity) {

    let word = wordListHelper[Math.floor(Math.random() * wordListHelper.length)]
    let indexToRemove = wordListHelper.indexOf(word);
    wordListHelper.splice(indexToRemove, 1);

    if (!posArray[word.pos]) {
      posArray[word.pos] = 1
    }
    arr.push(word)



    if (arr.length === 7) {
      if (Object.keys(posArray).length !== 4) {

        if (!posArray['adjective']) {
          let Filling = wordListHelper.filter((item) => item.pos == "adjective")
          if (Filling.length !== 0) {
            let word = Filling[Math.floor(Math.random() * Filling.length)]
            let indexToRemove = wordListHelper.indexOf(word);
            wordListHelper.splice(indexToRemove, 1);

            arr.push(word)

          }

        }
        if (!posArray['noun']) {
          let Filling = wordListHelper.filter((item) => item.pos == "noun")
          if (Filling.length !== 0) {
            let word = Filling[Math.floor(Math.random() * Filling.length)]
            let indexToRemove = wordListHelper.indexOf(word);
            wordListHelper.splice(indexToRemove, 1);
            console.log(word.pos)

            arr.push(word)

          }

        }
        if (!posArray['verb']) {
          let Filling = wordListHelper.filter((item) => item.pos == "verb")
          if (Filling.length !== 0) {
            let word = Filling[Math.floor(Math.random() * Filling.length)]
            let indexToRemove = wordListHelper.indexOf(word);
            wordListHelper.splice(indexToRemove, 1);
            console.log(word.pos)

            arr.push(word)

          }

        }
        if (!posArray['adverb']) {
          let Filling = wordListHelper.filter((item) => item.pos == "adverb")
          if (Filling.length !== 0) {
            let word = Filling[Math.floor(Math.random() * Filling.length)]
            let indexToRemove = wordListHelper.indexOf(word);
            wordListHelper.splice(indexToRemove, 1);
            console.log(word.pos)

            arr.push(word)

          }

        }



      }
    }

  }
  return (arr)
}




app.get("/", (req, res) => {
  /* 2 loops first one will loop untill the set length is equal 4 
    and on each loop we check if the pos is still 1 then we add it
     if not then we remove it 
  */
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

app.listen(5000, () => {
  console.log("Server is Running")
})