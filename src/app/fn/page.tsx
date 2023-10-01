"use client";
import { ChangeEvent, useState } from "react";

import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import * as E from "fp-ts/Either";
import * as Ap from "fp-ts/Apply";
import { pipe } from "fp-ts/lib/function";
import { getOrElse } from "fp-ts/lib/EitherT";

function validatorAsd(value: O.Option<string>): E.Either<string[], string> {
  return pipe(
    value,
    O.fold(
      () => E.left(["Empty"]),
      (v) => (v === "asd" ? E.left(["asd found"]) : E.right(v))
    )
  );
}

export default function Page() {
  const [username, setUsername] = useState<O.Option<string>>(O.none);
  const [password, setPassword] = useState<O.Option<string>>(O.none);
  const [errors, setErrors] = useState<O.Option<Array<string>>>(O.none);

  function onChange(callback: (e: O.Option<string>) => void) {
    return (e: Readonly<ChangeEvent<HTMLInputElement>>) => {
      return pipe(e.target.value, O.fromNullable, callback);
    };
  }

  function onClick() {
    return pipe(validateInput(username, password), (x) => x);
  }

  function sendValidData(data: { username: string; password: string }) {
    // eslint-disable-next-line functional/no-expression-statements
    console.log(data);
  }

  function validateInput(
    username: O.Option<string>,
    password: O.Option<string>
  ) {
    const Apl = E.getApplicativeValidation(A.getSemigroup<string>());

    const validator = Ap.sequenceS(Apl);
    return pipe(
      validator({
        username: validatorAsd(username),
        password: validatorAsd(password),
      }),
      E.match(
        (err) => setErrors(O.some(err)),
        (data) => pipe(data, sendValidData, () => setErrors(O.none))
      )
    );
  }

  return (
    <>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={pipe(
                username,
                O.getOrElse(() => "")
              )}
              onChange={onChange(setUsername)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={pipe(
                password,
                O.getOrElse(() => "")
              )}
              onChange={onChange(setPassword)}
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClick}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        {pipe(
          errors,
          O.fold(
            () => null,
            (errors: string[]) =>
              errors.map((err, i) => (
                <p className="text-center text-gray-500 text-xs" key={err + i}>
                  {err}
                </p>
              ))
          )
        )}
      </div>
    </>
  );
}
