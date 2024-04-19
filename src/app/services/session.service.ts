import { Inject, Injectable, signal } from '@angular/core';
import { Account, AuthToken } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private static readonly AUTH = 'AUTH';
  private static readonly ACCOUNT = 'ACCOUNT';

  tokenSig = signal<AuthToken | undefined | null>(undefined);
  accountSig = signal<Account | undefined | null>(undefined);

  setSession(account: Account, token: AuthToken) {
    localStorage?.setItem(SessionService.AUTH, JSON.stringify(token));
    localStorage?.setItem(SessionService.ACCOUNT, JSON.stringify(account));
    this.accountSig.set(account);
    this.tokenSig.set(token);
  }

  getSessionAccount() {
    let account = this.accountSig();
    if (account) return account;
    const storedAccount = localStorage.getItem(SessionService.ACCOUNT);
    if (storedAccount)
      this.accountSig.set(JSON.parse(storedAccount) as Account);
    return this.accountSig();
  }

  getSessionToken() {
    let session = this.tokenSig();
    if (session) return session;
    const storedToken = localStorage.getItem(SessionService.AUTH);
    if (storedToken) this.tokenSig.set(JSON.parse(storedToken) as AuthToken);
    return this.tokenSig();
  }

  removeSession() {
    localStorage?.removeItem(SessionService.ACCOUNT);
    localStorage?.removeItem(SessionService.AUTH);
    this.accountSig.set(undefined);
    this.tokenSig.set(undefined);
  }
}
