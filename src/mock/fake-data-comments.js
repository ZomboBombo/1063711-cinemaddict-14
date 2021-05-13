import dayjs from 'dayjs';
import { getRandomInteger } from '../utils.js';


// ----------- CONSTANTS -----------
const FIRST_ARRAY_ELEMENT_INDEX = 0;
const ARRAY_LENGTH_SHIFT = 1;

const RELATIVE_PATH_TO_EMOJI = './images/emoji/';

const DAY_GAP = 7;


/*
 * *** Function to generate a comment message
 */
const getCommentMessage = () => {
  const commentMessages = [
    'Шикарный фильм! Всем рекомендую его к просмотру!',
    '10 из 10!!!',
    'лол кек поугарал',
    'Тот момент, где ГГ верхом на лошади проскальзывает под идущим на полном ходу поездом, мне понравился больше всего!',
    'Полная чушь. Безвкусица. Режиссёр, видимо, не получал режиссёрского образования! А сценаристы — сценаристского! Да и актёры — актёрского!',
    'мне не понравиляс фильм я требую деньги назад мне не понравилось буду его хейтить на стене у себя сделаю пост что фильм не интересный пусть все знают !!',
    'Очень грамотная режиссёрская работа! Актёрская игра на высшем уровне! Браво! Я аплодирую стоя!',
    'ну такое себе... лучше бы пива попил',
    'О, да! Я смотрел этот фильм! Он — просто пушка!!!',
    'Ерунда, а не мультик! Вот в наше время, в Советское, умели мультики рисовать! Те же «Ну, погоди!» только чего стоят! А это... Тьфу! Брехня...',
    'Впервые посмотрел этот фильм, когда мне было лет 12... До сих пор его обожаю! Классика американского кино! Всем советую!',
    'В этом кинотеатре продают очень вкусный попкорн. Всякий разный: и солёный, и карамельный, и с вишнёвым сиропом, и с кусочками сушёных бананов, и с изюмом, и даже с шоколадной начинкой! А, ну ещё фильмы показывают. Ой, а какие там чипсы хрустящие — м-м-м....',
  ];

  return commentMessages[getRandomInteger(FIRST_ARRAY_ELEMENT_INDEX, commentMessages.length - ARRAY_LENGTH_SHIFT)];
};


/*
 * *** Function to generate a comment emoji
 */
const getCommentEmoji = () => {
  const emojiIcons = [
    'smile.png',
    'sleeping.png',
    'puke.png',
    'angry.png',
  ];

  return RELATIVE_PATH_TO_EMOJI + emojiIcons[getRandomInteger(FIRST_ARRAY_ELEMENT_INDEX, emojiIcons.length - ARRAY_LENGTH_SHIFT)];
};


/*
 * *** Function to generate a comment author
 */
const getCommentAuthor = () => {
  const commentAuthorName = [
    'Гомер',
    'Регина',
    'Альфред',
    'Констанция',
    'Мирко',
    'Святослава',
    'Евпатий',
    'Алевтина',
    'Джузеппе',
    'Афродита',
    'Фридрих',
    'Максимильетта',
  ];

  const commentAuthorSurname = [
    'Гонсалес',
    'Милосскаy',
    'де Круандо',
    'Дьяк',
    'Милько',
    'Ли',
    'Орегано',
    'Брынза',
    'аль Монако',
    'Стервелло',
    'Штолль',
    'Глянсце',
  ];

  const randomAuthorName = commentAuthorName[getRandomInteger(FIRST_ARRAY_ELEMENT_INDEX, commentAuthorName.length - ARRAY_LENGTH_SHIFT)];
  const randomAuthorSurname = commentAuthorSurname[getRandomInteger(FIRST_ARRAY_ELEMENT_INDEX, commentAuthorSurname.length - ARRAY_LENGTH_SHIFT)];

  return `${randomAuthorName} ${randomAuthorSurname}`;
};


/*
 * *** Function to generate a comment date
 */
const getCommentDate = () => {
  const dayGap = getRandomInteger(-DAY_GAP, DAY_GAP);
  const commentDate = dayjs().add(dayGap, 'day').toDate();

  return commentDate;
};


export const generateComment = () => {
  return {
    message: getCommentMessage(),
    emoji: getCommentEmoji(),
    author: getCommentAuthor(),
    date: getCommentDate(),
  };
};
