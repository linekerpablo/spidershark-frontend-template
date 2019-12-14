import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AgmCoreModule } from '@agm/core';
import { DuasCasasDecimaisDirective } from 'app/directives/DuasCasasDecimaisDirective';

const routes = [
    {
        path: 'privacidade',
        loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAbClGe0yIqfMAoanaR6wFIZLBbZtAv51A'
        })
    ],
    declarations: [
        DuasCasasDecimaisDirective
    ]
})
export class AppsModule {}
