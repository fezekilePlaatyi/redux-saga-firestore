import { call, put, take } from "redux-saga/effects";
import { setUser } from "../../ducks/user";
import { requestGetUser } from "../requests/user";

export function* handleGetUser(action) {
  const channel = yield call(requestGetUser, action.departmentIds);

  try {
    while (true) {
      const casesResponse = yield take(channel);
      yield put(setUser(casesResponse));
    }
  } catch (error) {
    console.log(error);
  }
}
