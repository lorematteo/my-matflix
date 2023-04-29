

export default function isWeeklyNew(date:Date){
  let now = new Date();
  let seconds = now.getTime() / 1000;

  let createdAt = new Date(date);
  let createdAtSeconds = createdAt.getTime() / 1000;

  if((seconds - createdAtSeconds) < (60*60*24*7)){
    return true;
  } else {
    return false;
  }
}