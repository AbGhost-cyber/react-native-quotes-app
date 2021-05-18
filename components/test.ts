const unF = ["M", "S", "C"];

let F: string[] = [];

const push = (it: string) => {
  const exists = F.find((item) => item.includes(it));
  if (exists) {
    const itemIndex = F.findIndex((item) => item.includes(item));
    F.splice(itemIndex, 1);
    console.log(F);
    
  } else {
    const index = unF.find((item) => item.includes(it));
    if (index) {
      F = F.concat(index);
    }
    console.log(F);
    
  }
};

