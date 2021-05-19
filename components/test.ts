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

declare function f1(): { a: number; b: string };

type T0 = Parameters<(s: number) => string>;

class C {
  x = 0;
  y = 0;
}
type T1 = InstanceType<typeof C>;

const c: T1 = {
  x: 0,
  y: 1,
};

function toHex(this: number) {
  return this.toString();
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

let list = [4, 5, 6];

for (let i of list) console.log(i);
