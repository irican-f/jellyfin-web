import type { SyncPlayUserAccessType, UserDto, UserPolicy } from '@jellyfin/sdk/lib/generated-client';
import React, { FunctionComponent, useCallback, useEffect, useState, useRef } from 'react';
import escapeHTML from 'escape-html';

import Dashboard from '../../../../utils/dashboard';
import globalize from '../../../../scripts/globalize';
import LibraryMenu from '../../../../scripts/libraryMenu';
import ButtonElement from '../../../../elements/ButtonElement';
import CheckBoxElement from '../../../../elements/CheckBoxElement';
import InputElement from '../../../../elements/InputElement';
import LinkEditUserPreferences from '../../../../components/dashboard/users/LinkEditUserPreferences';
import SectionTitleContainer from '../../../../elements/SectionTitleContainer';
import SectionTabs from '../../../../components/dashboard/users/SectionTabs';
import loading from '../../../../components/loading/loading';
import toast from '../../../../components/toast/toast';
import { getParameterByName } from '../../../../utils/url';
import SelectElement from '../../../../elements/SelectElement';
import Page from '../../../../components/Page';

type ResetProvider = AuthProvider & {
    checkedAttribute: string
};

type AuthProvider = {
    Name?: string;
    Id?: string;
};

type ExtendedUserPolicy = UserPolicy & {
    EnablePlexBotAccess: boolean;
    EnablePlexBotManagement: boolean;
};

const getCheckedElementDataIds = (elements: NodeListOf<Element>) => (
    Array.prototype.filter.call(elements, e => e.checked)
        .map(e => e.getAttribute('data-id'))
);

function onSaveComplete() {
    Dashboard.navigate('/dashboard/users')
        .catch(err => {
            console.error('[useredit] failed to navigate to user profile', err);
        });
    loading.hide();
    toast(globalize.translate('SettingsSaved'));
}

const UserEdit: FunctionComponent = () => {
    const [ userName, setUserName ] = useState('');
    const [ deleteFoldersAccess, setDeleteFoldersAccess ] = useState<ResetProvider[]>([]);
    const [ authProviders, setAuthProviders ] = useState<AuthProvider[]>([]);
    const [ passwordResetProviders, setPasswordResetProviders ] = useState<ResetProvider[]>([]);

    const [ authenticationProviderId, setAuthenticationProviderId ] = useState('');
    const [ passwordResetProviderId, setPasswordResetProviderId ] = useState('');

    const element = useRef<HTMLDivElement>(null);

    const triggerChange = (select: HTMLInputElement) => {
        const evt = new Event('change', { bubbles: false, cancelable: true });
        select.dispatchEvent(evt);
    };

    const getUser = () => {
        const userId = getParameterByName('userId');
        return window.ApiClient.getUser(userId);
    };

    const loadAuthProviders = useCallback((user, providers) => {
        const page = element.current;

        if (!page) {
            console.error('Unexpected null reference');
            return;
        }

        const fldSelectLoginProvider = page.querySelector('.fldSelectLoginProvider') as HTMLDivElement;
        fldSelectLoginProvider.classList.toggle('hide', providers.length <= 1);

        setAuthProviders(providers);

        const currentProviderId = user.Policy.AuthenticationProviderId;
        setAuthenticationProviderId(currentProviderId);
    }, []);

    const loadPasswordResetProviders = useCallback((user, providers) => {
        const page = element.current;

        if (!page) {
            console.error('Unexpected null reference');
            return;
        }

        const fldSelectPasswordResetProvider = page.querySelector('.fldSelectPasswordResetProvider') as HTMLDivElement;
        fldSelectPasswordResetProvider.classList.toggle('hide', providers.length <= 1);

        setPasswordResetProviders(providers);

        const currentProviderId = user.Policy.PasswordResetProviderId;
        setPasswordResetProviderId(currentProviderId);
    }, []);

    const loadDeleteFolders = useCallback((user, mediaFolders) => {
        const page = element.current;

        if (!page) {
            console.error('Unexpected null reference');
            return;
        }

        window.ApiClient.getJSON(window.ApiClient.getUrl('Channels', {
            SupportsMediaDeletion: true
        })).then(function (channelsResult) {
            let isChecked;
            let checkedAttribute;
            const itemsArr: ResetProvider[] = [];

            for (const folder of mediaFolders) {
                isChecked = user.Policy.EnableContentDeletion || user.Policy.EnableContentDeletionFromFolders.indexOf(folder.Id) != -1;
                checkedAttribute = isChecked ? ' checked="checked"' : '';
                itemsArr.push({
                    Id: folder.Id,
                    Name: folder.Name,
                    checkedAttribute: checkedAttribute
                });
            }

            for (const folder of channelsResult.Items) {
                isChecked = user.Policy.EnableContentDeletion || user.Policy.EnableContentDeletionFromFolders.indexOf(folder.Id) != -1;
                checkedAttribute = isChecked ? ' checked="checked"' : '';
                itemsArr.push({
                    Id: folder.Id,
                    Name: folder.Name,
                    checkedAttribute: checkedAttribute
                });
            }

            setDeleteFoldersAccess(itemsArr);

            const chkEnableDeleteAllFolders = page.querySelector('.chkEnableDeleteAllFolders') as HTMLInputElement;
            chkEnableDeleteAllFolders.checked = user.Policy.EnableContentDeletion;
            triggerChange(chkEnableDeleteAllFolders);
        }).catch(err => {
            console.error('[useredit] failed to fetch channels', err);
        });
    }, []);

    const loadUser = useCallback((user) => {
        const page = element.current;

        if (!page) {
            console.error('Unexpected null reference');
            return;
        }

        window.ApiClient.getJSON(window.ApiClient.getUrl('Auth/Providers')).then(function (providers) {
            loadAuthProviders(user, providers);
        }).catch(err => {
            console.error('[useredit] failed to fetch auth providers', err);
        });
        window.ApiClient.getJSON(window.ApiClient.getUrl('Auth/PasswordResetProviders')).then(function (providers) {
            loadPasswordResetProviders(user, providers);
        }).catch(err => {
            console.error('[useredit] failed to fetch password reset providers', err);
        });
        window.ApiClient.getJSON(window.ApiClient.getUrl('Library/MediaFolders', {
            IsHidden: false
        })).then(function (folders) {
            loadDeleteFolders(user, folders.Items);
        }).catch(err => {
            console.error('[useredit] failed to fetch media folders', err);
        });

        const disabledUserBanner = page.querySelector('.disabledUserBanner') as HTMLDivElement;
        disabledUserBanner.classList.toggle('hide', !user.Policy.IsDisabled);

        const txtUserName = page.querySelector('#txtUserName') as HTMLInputElement;
        txtUserName.disabled = false;
        txtUserName.removeAttribute('disabled');

        const lnkEditUserPreferences = page.querySelector('.lnkEditUserPreferences') as HTMLDivElement;
        lnkEditUserPreferences.setAttribute('href', 'mypreferencesmenu.html?userId=' + user.Id);
        LibraryMenu.setTitle(user.Name);
        setUserName(user.Name);

        const userPolicy: ExtendedUserPolicy = {
            ...user.Policy
        } as ExtendedUserPolicy;

        console.log('User policy', userPolicy);

        (page.querySelector('#txtUserName') as HTMLInputElement).value = user.Name;
        (page.querySelector('.chkIsAdmin') as HTMLInputElement).checked = userPolicy.IsAdministrator ?? false;
        (page.querySelector('.chkDisabled') as HTMLInputElement).checked = userPolicy.IsDisabled ?? false;
        (page.querySelector('.chkIsHidden') as HTMLInputElement).checked = userPolicy.IsHidden!;
        (page.querySelector('.chkEnableCollectionManagement') as HTMLInputElement).checked = userPolicy.EnableCollectionManagement ?? false;
        (page.querySelector('.chkRemoteControlSharedDevices') as HTMLInputElement).checked = userPolicy.EnableSharedDeviceControl ?? false;
        (page.querySelector('.chkEnableRemoteControlOtherUsers') as HTMLInputElement).checked = userPolicy.EnableRemoteControlOfOtherUsers ?? false;
        (page.querySelector('.chkEnableDownloading') as HTMLInputElement).checked = userPolicy.EnableContentDownloading ?? false;
        (page.querySelector('.chkManageLiveTv') as HTMLInputElement).checked = userPolicy.EnableLiveTvManagement ?? false;
        (page.querySelector('.chkEnableLiveTvAccess') as HTMLInputElement).checked = userPolicy.EnableLiveTvAccess ?? false;
        (page.querySelector('.chkEnableMediaPlayback') as HTMLInputElement).checked = userPolicy.EnableMediaPlayback ?? false;
        (page.querySelector('.chkEnableAudioPlaybackTranscoding') as HTMLInputElement).checked = userPolicy.EnableAudioPlaybackTranscoding ?? false;
        (page.querySelector('.chkEnableVideoPlaybackTranscoding') as HTMLInputElement).checked = userPolicy.EnableVideoPlaybackTranscoding ?? false;
        (page.querySelector('.chkEnableVideoPlaybackRemuxing') as HTMLInputElement).checked = userPolicy.EnablePlaybackRemuxing ?? false;
        (page.querySelector('.chkForceRemoteSourceTranscoding') as HTMLInputElement).checked = userPolicy.ForceRemoteSourceTranscoding ?? false;
        (page.querySelector('.chkRemoteAccess') as HTMLInputElement).checked = userPolicy.EnableRemoteAccess == null || userPolicy.EnableRemoteAccess;
        (page.querySelector('#txtRemoteClientBitrateLimit') as HTMLInputElement).value = userPolicy.RemoteClientBitrateLimit && userPolicy.RemoteClientBitrateLimit > 0 ?
            (userPolicy.RemoteClientBitrateLimit / 1e6).toLocaleString(undefined, { maximumFractionDigits: 6 }) : '';
        (page.querySelector('#txtLoginAttemptsBeforeLockout') as HTMLInputElement).value = String(userPolicy.LoginAttemptsBeforeLockout ?? '0');
        (page.querySelector('#txtMaxActiveSessions') as HTMLInputElement).value = String(userPolicy.MaxActiveSessions ?? '0');
        (page.querySelector('.chkEnablePlexBotAccess') as HTMLInputElement).checked = userPolicy.EnablePlexBotAccess;
        (page.querySelector('.chkEnablePlexBotManagement') as HTMLInputElement).checked = userPolicy.EnablePlexBotManagement;

        if (window.ApiClient.isMinServerVersion('10.6.0')) {
            (page.querySelector('#selectSyncPlayAccess') as HTMLSelectElement).value = String(userPolicy.SyncPlayAccess);
        }

        loading.hide();
    }, [loadAuthProviders, loadPasswordResetProviders, loadDeleteFolders ]);

    const loadData = useCallback(() => {
        loading.show();
        getUser().then(function (user) {
            loadUser(user);
        }).catch(err => {
            console.error('[useredit] failed to load data', err);
        });
    }, [loadUser]);

    useEffect(() => {
        const page = element.current;

        if (!page) {
            console.error('Unexpected null reference');
            return;
        }

        loadData();

        const saveUser = (user: UserDto) => {
            if (!user.Id || !user.Policy) {
                throw new Error('Unexpected null user id or policy');
            }

            const policy: ExtendedUserPolicy = {
                ...user.Policy
            } as ExtendedUserPolicy;

            user.Name = (page.querySelector('#txtUserName') as HTMLInputElement).value;
            policy.IsAdministrator = (page.querySelector('.chkIsAdmin') as HTMLInputElement).checked;
            policy.IsHidden = (page.querySelector('.chkIsHidden') as HTMLInputElement).checked;
            policy.IsDisabled = (page.querySelector('.chkDisabled') as HTMLInputElement).checked;
            policy.EnableRemoteControlOfOtherUsers = (page.querySelector('.chkEnableRemoteControlOtherUsers') as HTMLInputElement).checked;
            policy.EnableLiveTvManagement = (page.querySelector('.chkManageLiveTv') as HTMLInputElement).checked;
            policy.EnableLiveTvAccess = (page.querySelector('.chkEnableLiveTvAccess') as HTMLInputElement).checked;
            policy.EnableSharedDeviceControl = (page.querySelector('.chkRemoteControlSharedDevices') as HTMLInputElement).checked;
            policy.EnableMediaPlayback = (page.querySelector('.chkEnableMediaPlayback') as HTMLInputElement).checked;
            policy.EnableAudioPlaybackTranscoding = (page.querySelector('.chkEnableAudioPlaybackTranscoding') as HTMLInputElement).checked;
            policy.EnableVideoPlaybackTranscoding = (page.querySelector('.chkEnableVideoPlaybackTranscoding') as HTMLInputElement).checked;
            policy.EnablePlaybackRemuxing = (page.querySelector('.chkEnableVideoPlaybackRemuxing') as HTMLInputElement).checked;
            policy.EnableCollectionManagement = (page.querySelector('.chkEnableCollectionManagement') as HTMLInputElement).checked;
            policy.ForceRemoteSourceTranscoding = (page.querySelector('.chkForceRemoteSourceTranscoding') as HTMLInputElement).checked;
            policy.EnableContentDownloading = (page.querySelector('.chkEnableDownloading') as HTMLInputElement).checked;
            policy.EnableRemoteAccess = (page.querySelector('.chkRemoteAccess') as HTMLInputElement).checked;
            policy.RemoteClientBitrateLimit = Math.floor(1e6 * parseFloat((page.querySelector('#txtRemoteClientBitrateLimit') as HTMLInputElement).value || '0'));
            policy.LoginAttemptsBeforeLockout = parseInt((page.querySelector('#txtLoginAttemptsBeforeLockout') as HTMLInputElement).value || '0', 10);
            policy.MaxActiveSessions = parseInt((page.querySelector('#txtMaxActiveSessions') as HTMLInputElement).value || '0', 10);
            policy.AuthenticationProviderId = (page.querySelector('#selectLoginProvider') as HTMLSelectElement).value;
            policy.PasswordResetProviderId = (page.querySelector('#selectPasswordResetProvider') as HTMLSelectElement).value;
            policy.EnableContentDeletion = (page.querySelector('.chkEnableDeleteAllFolders') as HTMLInputElement).checked;
            policy.EnableContentDeletionFromFolders = user.Policy.EnableContentDeletion ? [] : getCheckedElementDataIds(page.querySelectorAll('.chkFolder'));
            policy.SyncPlayAccess = (page.querySelector('#selectSyncPlayAccess') as HTMLSelectElement).value as SyncPlayUserAccessType;
            policy.EnablePlexBotAccess = (page.querySelector('.chkEnablePlexBotAccess') as HTMLInputElement).checked;
            policy.EnablePlexBotManagement = (page.querySelector('.chkEnablePlexBotManagement') as HTMLInputElement).checked;

            window.ApiClient.updateUser(user).then(() => (
                window.ApiClient.updateUserPolicy(user.Id || '', policy || { PasswordResetProviderId: '', AuthenticationProviderId: '' })
            )).then(() => {
                onSaveComplete();
            }).catch(err => {
                console.error('[useredit] failed to update user', err);
            });
        };

        const onSubmit = (e: Event) => {
            loading.show();
            getUser().then(function (result) {
                saveUser(result);
            }).catch(err => {
                console.error('[useredit] failed to fetch user', err);
            });
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        (page.querySelector('.chkEnableDeleteAllFolders') as HTMLInputElement).addEventListener('change', function (this: HTMLInputElement) {
            (page.querySelector('.deleteAccess') as HTMLDivElement).classList.toggle('hide', this.checked);
        });

        window.ApiClient.getNamedConfiguration('network').then(function (config) {
            (page.querySelector('.fldRemoteAccess') as HTMLDivElement).classList.toggle('hide', !config.EnableRemoteAccess);
        }).catch(err => {
            console.error('[useredit] failed to load network config', err);
        });

        (page.querySelector('.editUserProfileForm') as HTMLFormElement).addEventListener('submit', onSubmit);

        (page.querySelector('#btnCancel') as HTMLButtonElement).addEventListener('click', function() {
            window.history.back();
        });
    }, [loadData]);

    const optionLoginProvider = authProviders.map((provider) => {
        const selected = provider.Id === authenticationProviderId || authProviders.length < 2 ? ' selected' : '';
        return `<option value="${provider.Id}"${selected}>${escapeHTML(provider.Name)}</option>`;
    });

    const optionPasswordResetProvider = passwordResetProviders.map((provider) => {
        const selected = provider.Id === passwordResetProviderId || passwordResetProviders.length < 2 ? ' selected' : '';
        return `<option value="${provider.Id}"${selected}>${escapeHTML(provider.Name)}</option>`;
    });

    const optionSyncPlayAccess = () => {
        let content = '';
        content += `<option value='CreateAndJoinGroups'>${globalize.translate('LabelSyncPlayAccessCreateAndJoinGroups')}</option>`;
        content += `<option value='JoinGroups'>${globalize.translate('LabelSyncPlayAccessJoinGroups')}</option>`;
        content += `<option value='None'>${globalize.translate('LabelSyncPlayAccessNone')}</option>`;
        return content;
    };

    return (
        <Page
            id='editUserPage'
            className='mainAnimatedPage type-interior'
        >
            <div ref={element} className='content-primary'>
                <div className='verticalSection'>
                    <SectionTitleContainer
                        title={userName}
                        url='https://jellyfin.org/docs/general/server/users/'
                    />
                </div>

                <SectionTabs activeTab='useredit'/>
                <div
                    className='lnkEditUserPreferencesContainer'
                    style={{ paddingBottom: '1em' }}
                >
                    <LinkEditUserPreferences
                        className= 'lnkEditUserPreferences button-link'
                        title= 'ButtonEditOtherUserPreferences'
                    />
                </div>
                <form className='editUserProfileForm'>
                    <div className='disabledUserBanner hide'>
                        <div className='btn btnDarkAccent btnStatic'>
                            <div>
                                {globalize.translate('HeaderThisUserIsCurrentlyDisabled')}
                            </div>
                            <div style={{ marginTop: 5 }}>
                                {globalize.translate('MessageReenableUser')}
                            </div>
                        </div>
                    </div>
                    <div id='fldUserName' className='inputContainer'>
                        <InputElement
                            type='text'
                            id='txtUserName'
                            label='LabelName'
                            options={'required'}
                        />
                    </div>
                    <div className='selectContainer fldSelectLoginProvider hide'>
                        <SelectElement
                            id='selectLoginProvider'
                            label='LabelAuthProvider'
                        >
                            {optionLoginProvider}
                        </SelectElement>

                        <div className='fieldDescription'>
                            {globalize.translate('AuthProviderHelp')}
                        </div>
                    </div>
                    <div className='selectContainer fldSelectPasswordResetProvider hide'>
                        <SelectElement
                            id='selectPasswordResetProvider'
                            label='LabelPasswordResetProvider'
                        >
                            {optionPasswordResetProvider}
                        </SelectElement>
                        <div className='fieldDescription'>
                            {globalize.translate('PasswordResetProviderHelp')}
                        </div>
                    </div>
                    <div className='checkboxContainer checkboxContainer-withDescription fldRemoteAccess hide'>
                        <CheckBoxElement
                            className='chkRemoteAccess'
                            title='AllowRemoteAccess'
                        />
                        <div className='fieldDescription checkboxFieldDescription'>
                            {globalize.translate('AllowRemoteAccessHelp')}
                        </div>
                    </div>
                    <CheckBoxElement
                        labelClassName='checkboxContainer'
                        className='chkIsAdmin'
                        title='OptionAllowUserToManageServer'
                    />
                    <CheckBoxElement
                        labelClassName='checkboxContainer'
                        className='chkEnableCollectionManagement'
                        title='AllowCollectionManagement'
                    />
                    <div id='featureAccessFields' className='verticalSection'>
                        <h2 className='paperListLabel'>
                            {globalize.translate('HeaderFeatureAccess')}
                        </h2>
                        <div className='checkboxList paperList' style={{ padding: '.5em 1em' }}>
                            <CheckBoxElement
                                className='chkEnableLiveTvAccess'
                                title='OptionAllowBrowsingLiveTv'
                            />
                            <CheckBoxElement
                                className='chkManageLiveTv'
                                title='OptionAllowManageLiveTv'
                            />
                            <CheckBoxElement
                                className='chkEnablePlexBotAccess'
                                title='OptionAllowPlexBotAccess'
                            />
                            <CheckBoxElement
                                className='chkEnablePlexBotManagement'
                                title='OptionAllowManagePlexBot'
                            />
                        </div>
                    </div>
                    <div className='verticalSection'>
                        <h2 className='paperListLabel'>
                            {globalize.translate('HeaderPlayback')}
                        </h2>
                        <div className='checkboxList paperList' style={{ padding: '.5em 1em' }}>
                            <CheckBoxElement
                                className='chkEnableMediaPlayback'
                                title='OptionAllowMediaPlayback'
                            />
                            <CheckBoxElement
                                className='chkEnableAudioPlaybackTranscoding'
                                title='OptionAllowAudioPlaybackTranscoding'
                            />
                            <CheckBoxElement
                                className='chkEnableVideoPlaybackTranscoding'
                                title='OptionAllowVideoPlaybackTranscoding'
                            />
                            <CheckBoxElement
                                className='chkEnableVideoPlaybackRemuxing'
                                title='OptionAllowVideoPlaybackRemuxing'
                            />
                            <CheckBoxElement
                                className='chkForceRemoteSourceTranscoding'
                                title='OptionForceRemoteSourceTranscoding'
                            />
                        </div>
                        <div className='fieldDescription'>
                            {globalize.translate('OptionAllowMediaPlaybackTranscodingHelp')}
                        </div>
                    </div>
                    <br />
                    <div className='verticalSection'>
                        <div className='inputContainer'>
                            <InputElement
                                type='number'
                                id='txtRemoteClientBitrateLimit'
                                label='LabelRemoteClientBitrateLimit'
                                options={'inputMode="decimal" pattern="[0-9]*(.[0-9]+)?" min="{0}" step=".25"'}
                            />
                            <div className='fieldDescription'>
                                {globalize.translate('LabelRemoteClientBitrateLimitHelp')}
                            </div>
                            <div className='fieldDescription'>
                                {globalize.translate('LabelUserRemoteClientBitrateLimitHelp')}
                            </div>
                        </div>
                    </div>
                    <div className='verticalSection'>
                        <div className='selectContainer fldSelectSyncPlayAccess'>
                            <SelectElement
                                id='selectSyncPlayAccess'
                                label='LabelSyncPlayAccess'
                            >
                                {optionSyncPlayAccess()}
                            </SelectElement>
                            <div className='fieldDescription'>
                                {globalize.translate('SyncPlayAccessHelp')}
                            </div>
                        </div>
                    </div>
                    <div className='verticalSection'>
                        <h2 className='checkboxListLabel' style={{ marginBottom: '1em' }}>
                            {globalize.translate('HeaderAllowMediaDeletionFrom')}
                        </h2>
                        <div className='checkboxList paperList checkboxList-paperList'>
                            <CheckBoxElement
                                labelClassName='checkboxContainer'
                                className='chkEnableDeleteAllFolders'
                                title='AllLibraries'
                            />
                            <div className='deleteAccess'>
                                {deleteFoldersAccess.map(Item => (
                                    <CheckBoxElement
                                        key={Item.Id}
                                        className='chkFolder'
                                        itemId={Item.Id}
                                        itemName={Item.Name}
                                        itemCheckedAttribute={Item.checkedAttribute}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='verticalSection'>
                        <h2 className='checkboxListLabel'>
                            {globalize.translate('HeaderRemoteControl')}
                        </h2>
                        <div className='checkboxList paperList' style={{ padding: '.5em 1em' }}>
                            <CheckBoxElement
                                className='chkEnableRemoteControlOtherUsers'
                                title='OptionAllowRemoteControlOthers'
                            />
                            <CheckBoxElement
                                className='chkRemoteControlSharedDevices'
                                title='OptionAllowRemoteSharedDevices'
                            />
                        </div>
                        <div className='fieldDescription'>
                            {globalize.translate('OptionAllowRemoteSharedDevicesHelp')}
                        </div>
                    </div>
                    <h2 className='checkboxListLabel'>
                        {globalize.translate('Other')}
                    </h2>
                    <div className='checkboxContainer checkboxContainer-withDescription'>
                        <CheckBoxElement
                            className='chkEnableDownloading'
                            title='OptionAllowContentDownload'
                        />
                        <div className='fieldDescription checkboxFieldDescription'>
                            {globalize.translate('OptionAllowContentDownloadHelp')}
                        </div>
                    </div>
                    <div className='checkboxContainer checkboxContainer-withDescription' id='fldIsEnabled'>
                        <CheckBoxElement
                            className='chkDisabled'
                            title='OptionDisableUser'
                        />
                        <div className='fieldDescription checkboxFieldDescription'>
                            {globalize.translate('OptionDisableUserHelp')}
                        </div>
                    </div>
                    <div className='checkboxContainer checkboxContainer-withDescription' id='fldIsHidden'>
                        <CheckBoxElement
                            className='chkIsHidden'
                            title='OptionHideUser'
                        />
                        <div className='fieldDescription checkboxFieldDescription'>
                            {globalize.translate('OptionHideUserFromLoginHelp')}
                        </div>
                    </div>
                    <br />
                    <div className='verticalSection'>
                        <div className='inputContainer' id='fldLoginAttemptsBeforeLockout'>
                            <InputElement
                                type='number'
                                id='txtLoginAttemptsBeforeLockout'
                                label='LabelUserLoginAttemptsBeforeLockout'
                                options={'min={-1} step={1}'}
                            />
                            <div className='fieldDescription'>
                                {globalize.translate('OptionLoginAttemptsBeforeLockout')}
                            </div>
                            <div className='fieldDescription'>
                                {globalize.translate('OptionLoginAttemptsBeforeLockoutHelp')}
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className='verticalSection'>
                        <div className='inputContainer' id='fldMaxActiveSessions'>
                            <InputElement
                                type='number'
                                id='txtMaxActiveSessions'
                                label='LabelUserMaxActiveSessions'
                                options={'min={0} step={1}'}
                            />
                            <div className='fieldDescription'>
                                {globalize.translate('OptionMaxActiveSessions')}
                            </div>
                            <div className='fieldDescription'>
                                {globalize.translate('OptionMaxActiveSessionsHelp')}
                            </div>
                        </div>
                    </div>
                    <br />
                    <div>
                        <ButtonElement
                            type='submit'
                            className='raised button-submit block'
                            title='Save'
                        />
                        <ButtonElement
                            type='button'
                            id='btnCancel'
                            className='raised button-cancel block'
                            title='ButtonCancel'
                        />
                    </div>
                </form>
            </div>
        </Page>

    );
};

export default UserEdit;
