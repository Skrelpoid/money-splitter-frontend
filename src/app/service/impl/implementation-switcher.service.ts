import { Injectable, inject } from '@angular/core';
import { SplitterService } from '../splitter-service';
import { FrontendSplitterService } from './frontend-splitter.service';
import { BackendSplitterService } from './backend-splitter.service';


@Injectable({
  providedIn: 'root'
})
export class ImplementationSwitcherService {

  private implementation : SplitterService;
  private frontendImplementation : FrontendSplitterService = inject(FrontendSplitterService);
  private backendImplementation : BackendSplitterService = inject(BackendSplitterService);

  constructor() { 
    this.implementation = this.frontendImplementation;
  }

  getImplementation() : SplitterService {
    return this.implementation;
  }

  switchToFrontend() {
    this.implementation = this.frontendImplementation;
  }

  switchToBackend() {
    this.implementation = this.backendImplementation;
  }

  isFrontend() {
    return this.implementation === this.frontendImplementation;
  }

  isBackend() {
    return this.implementation === this.backendImplementation;
  }
}
