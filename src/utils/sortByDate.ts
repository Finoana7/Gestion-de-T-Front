interface DateObject {
  date: string;
  [key: string]: any;
}

export default function sortByDate(array: DateObject[]) {
  return array?.sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-")).getTime();
    const dateB = new Date(b.date.split("/").reverse().join("-")).getTime();
    return dateB - dateA;
  });
}
