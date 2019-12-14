import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Menu',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'Missoes',
                title    : 'Missões',
                translate: 'Missões',
                type     : 'item',
                icon     : 'announcement',
                url      : '/apps/missoes'
            },
            {
                id       : 'lembretes',
                title    : 'Lembretes',
                translate: 'Lembretes',
                type     : 'item',
                icon     : 'access_alarm',
                url      : '/apps/lembretes'
            },            
            {
                id       : 'MeuPerfil',
                title    : 'Meu perfil',
                translate: 'Meu perfil',
                type     : 'item',
                icon     : 'people',
                url      : '/apps/meu-perfil'
            },
            {
                id       : 'Medidas',
                title    : 'Medidas',
                translate: 'Medidas',
                type     : 'item',
                icon     : 'compare',
                url      : '/apps/medidas'
            },
            {
                id       : 'AlterarSenha',
                title    : 'Alterar senha',
                translate: 'Alterar senha',
                type     : 'item',
                icon     : 'autorenew',
                url      : '/apps/alterar-senha'
            },
            // {
            //     id       : 'alterar-senha',
            //     title    : 'Alterar senha',
            //     translate: 'Alterar senha',
            //     type     : 'item',
            //     icon     : 'account_box',
            //     url      : '/apps/alterar-senha'
            // }
        ]
    }
];
