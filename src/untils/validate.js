export const validatorName = (rule, value, callback) => {
 
  if (value !== "user" &&  value !== "admin") {
    return callback(new Error("用户名必须为user或者是admin"));
  } else {
    callback();
  }
};
export const isEmpty = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("密码不能为空"));
  } else {
    callback();
  }
};

export const filter_empty = obj => {
  let ob = {};
  let key = Object.keys(obj);
  key.forEach(item => {
    if (obj[item]) {
      ob[item] = obj[item];
    }
  });
  return ob;
};

export const search_key = (item, obj) => {
  let arr = [];
  let reg;
  if (obj.name) {
    arr.push("name");
  }
  if (obj.id) {
    arr.push("id");
  }
  if (obj.brand) {
    arr.push("brand");
  }
  if (arr.length == 1) {
    reg = item[arr[0]] === obj[arr[0]];
  } else if (arr.length == 2) {
    reg = item[arr[0]] === obj[arr[0]] && item[arr[1]] === obj[arr[1]];
  } else if (arr.length == 3) {
    reg =
      item[arr[0]] === obj[arr[1]] &&
      item[arr[1]] === obj[arr[2]] &&
      item[arr[2]] === obj[arr[3]];
  } else {
    reg = null;
  }
  return reg;
};
