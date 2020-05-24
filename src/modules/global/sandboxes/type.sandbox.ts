import {Injectable} from "@angular/core";
import {GlobalStateRef} from "@global/+state/global.reducer";
import {Store} from "@ngrx/store";
import {FetchType} from "@global/+state/global.actions";
import {GlobalSelectors} from "@global/+state/global.selectors";
import {filter, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Type} from "@global/entities";

@Injectable({
  providedIn: "root"
})
export class TypeSandbox {

  constructor(private store: Store<GlobalStateRef>) {
  }

  fetchTypes() {
    this.store.dispatch(new FetchType());
  }

  getTypes(): Observable<Array<Type>> {
    return this.store.select(GlobalSelectors.getTypes).pipe(filter(types => !!types));
  }
}
