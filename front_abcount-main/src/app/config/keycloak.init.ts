import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: "https://mihouodie.com",
                realm: 'abcount',
                clientId: 'frontend'
            },
            initOptions: {
                onLoad: 'login-required'
            }
        });
}
