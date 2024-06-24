import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { BowlingEffects } from './features/bowling/store/bowling.effects';
import { bowlingReducer } from './features/bowling/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideStore({
      score: bowlingReducer,
    }),
    provideStoreDevtools(),
    provideEffects(BowlingEffects),
  ],
};
