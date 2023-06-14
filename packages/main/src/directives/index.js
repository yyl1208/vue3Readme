/**
 * Configure and register global directives
 */
import { setupPermissionDirective } from './permission';
import { setupLoadingDirective } from './loading';

export function setupGlobDirectives(app) {
  setupPermissionDirective(app);
  setupLoadingDirective(app);
}
