export const useFindVacancyIdtoReaction = (reactionList, id) => {
   // const arrIds = reactionList.map(a => a.vacancy);
   const result = reactionList.find(el => el.vacancy === id);
   console.log(Boolean(result));
   return Boolean(result);
}