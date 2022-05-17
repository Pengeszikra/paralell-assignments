import { convertSourceToState } from "../library/convertSourceToState";
import { createIdList } from "../library/createIdList";
import { IQuizState, IQuestionSource } from "../state/quiz-declaration";

const source = [
  {
    "category": "Entertainment: Video Games",
    "type": "boolean",
    "difficulty": "hard",
    "question": "The retail disc of Tony Hawk&#039;s Pro Skater 5 only comes with the tutorial.",
    "correct_answer": "True",
    "incorrect_answers": ["False"]
  },
  {
    "category": "History",
    "type": "boolean",
    "difficulty": "hard",
    "question": "Japan was part of the Allied Powers during World War I.",
    "correct_answer": "True",
    "incorrect_answers": ["False"]
  },
  {
    "category": "Entertainment: Comics",
    "type": "boolean",
    "difficulty": "hard",
    "question": "In the comic book &quot;Archie&quot;, Betty is friends with Veronica because she is rich.",
    "correct_answer": "False",
    "incorrect_answers": ["True"]
  },
  {
    "category": "Entertainment: Video Games",
    "type": "boolean",
    "difficulty": "hard",
    "question": "In Undertale, having a &quot;Fun Value&quot; set to 56-57 will play the &quot;Wrong Number Song Call&quot;.",
    "correct_answer": "False",
    "incorrect_answers": ["True"]
  },
  {
    "category": "Politics",
    "type": "boolean",
    "difficulty": "hard",
    "question": "Joko Widodo has appeared in the cover of a TIME magazine.",
    "correct_answer": "True",
    "incorrect_answers": ["False"]
  },
  {
    "category": "Entertainment: Books",
    "type": "boolean",
    "difficulty": "hard",
    "question": "Harry Potter was born on July 31st, 1980.",
    "correct_answer": "True",
    "incorrect_answers": ["False"]
  },
  {
    "category": "Politics",
    "type": "boolean",
    "difficulty": "hard",
    "question": "Nazi Germany surrendered on Harry Truman&#039;s birthday while he was president.",
    "correct_answer": "True",
    "incorrect_answers": [
        "False"
    ]
  },
  {
    "category": "History",
    "type": "boolean",
    "difficulty": "hard",
    "question": "During the Winter War, the amount of Soviet Union soliders that died or went missing was five times more than Finland&#039;s.",
    "correct_answer": "True",
    "incorrect_answers": [
        "False"
    ]
  },
  {
    "category": "Entertainment: Film",
    "type": "boolean",
    "difficulty": "hard",
    "question": "The weapon Clint Eastwood uses in &quot;Dirty Harry&quot; was a .44 Automag.",
    "correct_answer": "False",
    "incorrect_answers": ["True"]
  },
  {
    "category": "Entertainment: Japanese Anime & Manga",
    "type": "boolean",
    "difficulty": "hard",
    "question": "The character Plum from &quot;No Game No Life&quot; is a girl.",
    "correct_answer": "False",
    "incorrect_answers": ["True"]
  }
];

test ('simple addition', () => {
  expect (
    source.at(-1).question
  ).toStrictEqual(
    "The character Plum from &quot;No Game No Life&quot; is a girl."
  );
});

test ('convert IQuestionSourceList to IQuizState', () => {
  expect (
    convertSourceToState(source, [])
  ).toStrictEqual(
    {sourceList: source}
  );
});

test ('create enough id for source', () => {
  let firstId = 100;
  const mockIdCreator = () => (firstId++).toString(); 
  
  expect (
    createIdList(mockIdCreator)(source.slice(0, 2))
    
  ).toStrictEqual(
    ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109']
  );
});