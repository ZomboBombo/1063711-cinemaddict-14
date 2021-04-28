import dayjs from 'dayjs';
import { getRandomInteger, isActive } from '../utils.js';


// ----------- CONSTANTS -----------
const RELATIVE_PATH_TO_POSTER = 'images/posters/';
const EMPTY_STRING = '';

const FIRST_ARRAY_ELEMENT_INDEX = 0;
const ARRAY_LENGTH_SHIFT = 1;

const MIN_RATE = 0;
const MAX_RATE = 10;
const SYMBOLS_COUNT_AFTER_COMMA = 1;

const MIN_MANUFACTURE_DATE = 1960;
const MAX_MANUFACTURE_DATE = 2021;

const MAX_DAYS_GAP = 7;

const FIRST_LETTER_INDEX = 0;
const MAX_DESCRIPTION_LENGTH = 139;
const ELLIPSIS = '...';


/*
 * *** Function to generate a random film poster
 */
const getFilmPoster = () => {
  const filmPosters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  return RELATIVE_PATH_TO_POSTER + filmPosters[getRandomInteger(FIRST_ARRAY_ELEMENT_INDEX, filmPosters.length - ARRAY_LENGTH_SHIFT)];
};


/*
 * *** Function to generate a random film name
 */
const generateFilmName = () => {
  const filmNames = [
    'Гарри Поттер (антология)',
    'Джон Уик',
    'Святые из Бундока',
    'Константин',
    'Тайна Коко',
    'Семь жизней',
    'Спасти рядового Райана',
  ];

  return filmNames[getRandomInteger(FIRST_ARRAY_ELEMENT_INDEX, filmNames.length - ARRAY_LENGTH_SHIFT)];
};


/*
 * *** Function to generate a film rate
 */
const getFilmRate = () => {
  const randomRateString = MIN_RATE + Math.random() * MAX_RATE;
  return Number(randomRateString.toFixed(SYMBOLS_COUNT_AFTER_COMMA));
};


/*
 * *** Function to generate a film manufacture date
 */
const getFilmManufactureDate = () => {
  return getRandomInteger(MIN_MANUFACTURE_DATE, MAX_MANUFACTURE_DATE);
};


/*
 * *** Function to generate a film duration (randomized with an error ±7 days)
 */
const getFilmDuration = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  return dayjs().add(daysGap, 'day').toDate();
};


/*
 * *** Function to generate a random film description
 */
const getFilmDescription = () => {
  const collectionOfFilmDescriptions = 'Он — бывший наёмный убийца — ведёт размеренную жизнь, когда преступник крадёт его любимый Mustang 1969 года и попутно убивает собаку Дейзи, единственное живое напоминание об умершей жене. Жажда мести пробуждает в нём, казалось, утерянную хватку. Жизнь десятилетнего мальчика нельзя назвать сладкой: его родители умерли, едва ему исполнился год, а от дяди и тётки, взявших сироту на воспитание, достаются лишь тычки да подзатыльники. Но в его одиннадцатый день рождения всё меняется. Странный гость, неожиданно появившийся на пороге, приносит письмо, из которого мальчик узнаёт, что на самом деле он — чистокровный волшебник и принят в Хогвартс — школу магии. А уже через пару недель будет мчаться в поезде «Хогвартс-экспресс» навстречу новой жизни, где его ждут невероятные приключения, верные друзья и самое главное — ключ к разгадке тайны смерти его родителей. Чего только не бывает на свете. Два обычных ирландских парня преспокойно жили и работали в своём родном Бостоне, пока в один прекрасный день на них не снизошло озарение: сам Бог послал их на землю с особой миссией, наделив святой силой, чтобы очистить мир от зла. И братья взялись за дело со всей серьёзностью, присущей ирландцам. Ему удалось не только побывать в аду, но и вернуться обратно. Родившись с неугодным самому себе талантом — способностью распознавать помесь ангелов и демонов, которые бродят по земле в облике людей, — он под давлением обстоятельств пытается совершить самоубийство, лишь бы избавиться от мучительных видений. Но неудачно. Воскрешенный против собственной воли, он снова оказывается в мире живых. Теперь, отмеченный печатью суицида и получивший временное право на жизнь, он патрулирует границу, разделяющую рай и ад, тщетно надеясь на обретение спасения путем сражения с земными ставленниками зла. 12-летний мальчик живёт в мексиканской деревушке в семье сапожников и тайно мечтает стать музыкантом. Тайно — потому что в его семейном клане музыка считается проклятием. Когда-то его прадед оставил свою жену, прабабку мальчика, ради мечты. С тех пор музыкальная тема в семье стала табу. Мальчик обнаруживает, что между ним и его любимым певцом Эрнесто де ла Крусом, ныне покойным, существует некая — пока неназванная — связь. Паренёк отправляется к своему кумиру в Страну Мёртвых, где встречает души своих предков. Главный герой отправляется в необычное путешествие в искупление фатального поступка своей жизни. В ходе своей поездки он встречает семерых незнакомцев, включая смертельно больную Эмили, которая называет себя девушкой с подбитыми крыльями. Он неожиданно влюбляется в неё, что сильно усложняет его первоначальный план. Капитан получает тяжёлое задание. Вместе с отрядом из восьми человек Миллер должен отправиться в тыл врага на поиски рядового Джеймса Райана, три родных брата которого почти одновременно погибли на полях сражений.';


  // --- Using the split() method, we split the string into separate sentences and form an array ---
  const arrayOfFilmDescriptionSentences = collectionOfFilmDescriptions.split('. ');


  /*
   * --- In a cycle, select several (from 1 to 5) random sentences from an array
   * --- of descriptions and form a string — a film description.
   */
  let fullFilmDescription = EMPTY_STRING;
  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    const randomSentenceIndex = getRandomInteger(0, arrayOfFilmDescriptionSentences.length - 1);
    const randomSentence = arrayOfFilmDescriptionSentences[randomSentenceIndex];
    fullFilmDescription += randomSentence + '. ';
  }


  /*
   * --- Checking the length of the movie description:
   * --- if it more than 140 characters, the line is cut off
   * --- and an ellipsis is added.
   */
  let filmDescription = fullFilmDescription.substr(FIRST_LETTER_INDEX, MAX_DESCRIPTION_LENGTH);
  if (filmDescription.length < fullFilmDescription.length) {
    filmDescription += ELLIPSIS;
  } else {
    filmDescription = fullFilmDescription;
  }

  return filmDescription;
};


/*
 * *** Function to generate a random film genre
 */
const generateFilmGenre = () => {
  const filmGenres = [
    'Фэнтези',
    'Экшн',
    'Криминальный боевик',
    'Триллер',
    'Мультфильм',
    'Драма',
    'Военный',
  ];

  return filmGenres[getRandomInteger(FIRST_ARRAY_ELEMENT_INDEX, filmGenres.length - ARRAY_LENGTH_SHIFT)];
};


export const generateFilmCard = () => {
  return {
    poster: getFilmPoster(),
    inWatchlist: isActive(),
    alreadyWatched: isActive(),
    isFavorite: isActive(),
    name: generateFilmName(),
    rate: getFilmRate(),
    manufactureDate: getFilmManufactureDate(),
    duration: getFilmDuration(),
    genre: generateFilmGenre(),
    description: getFilmDescription(),
    comments: [],
  };
};
