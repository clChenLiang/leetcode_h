// import { expect } from "chai";

interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: 'delay'
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message"
    };
  }
}

type JUST_FUN_KEY<T> = ({
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T])

type ConnectedModule<T> = {
  [K in JUST_FUN_KEY<T>]:
    T[K] extends (input: Promise<infer NT>) => Promise<Action<infer NU>> ? (input: NT) => Action<NU> :
    T[K] extends (action: Action<infer NT>) => Action<infer NU> ? (action: NT) => Action<NU> : never
}

// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type Connect = (module: EffectModule) => {
  [K in JUST_FUN_KEY<EffectModule>]: EffectModule[K] extends
    (input: Promise<infer T>) => Promise<Action<infer U>>
      ? (input: T) => Action<U> :
      EffectModule[K] extends (input: Action<infer T>) => Action<infer U> ? (action: T) => Action<U> : never
}

// type A = {
//   name: string;
//   label: string;
// }
// type B = {
//   name: string;
//   age: () => {};
// }

// type C<T> = ({
//   [K in keyof T]: T[K] extends Function ? K : never
// }[keyof T])

// type D = C<B>




const connect: Connect = m => ({
  delay: (input: number) => ({
    type: 'delay',
    payload: `hello 2`
  }),
  setMessage: (input: Date) => ({
    type: "set-message",
    payload: input.getMilliseconds()
  })
});

type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};

export const connected: Connected = connect(new EffectModule());
