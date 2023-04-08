import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
    RouterState,
    StoreRouterConnectingModule,
    routerReducer,
} from '@ngrx/router-store';

import { CommonModule } from '@angular/common';
import { DocumentsStoreModule } from './documents/documents.module';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DocumentsStoreModule,
        StoreModule.forRoot(
            {
                router: routerReducer,
            },
            {
                runtimeChecks: {
                    strictStateImmutability: false,
                    strictActionImmutability: false,
                    strictStateSerializability: false,
                    strictActionSerializability: false,
                },
            }
        ),
        EffectsModule.forRoot([]),
        // Connects RouterModule with StoreModule
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
            routerState: RouterState.Minimal,
        }),
        StoreDevtoolsModule.instrument({
            name: 'Languqge-app',
            maxAge: 50,
        }),
        HttpClientModule
    ],
    providers: [
    ],
})
export class CoreStoreModule {}
