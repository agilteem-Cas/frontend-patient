Summary: Front end for @Home web application patient side
Name: hcw-athome-patient
Version: 4.3.3
Release: 19
Group: Web Application
License: HUG
Source: %{name}-%{version}.tar.gz
BuildRoot: %{_tmppath}/%{name}-root
BuildArch: noarch
BuildRequires: nodejs
BuildRequires: git

%define _binaries_in_noarch_packages_terminate_build   0

%description
SPECS version 1

%prep
%__rm -rf %{_topdir}/BUILD
%__cp -a %{_sourcedir} %{_topdir}/BUILD

%install
make build
%{__install} -d -m0755 %{buildroot}/%{_datadir}/hcw-at-home/patient/
%{__cp} -a www/* %{buildroot}/%{_datadir}/hcw-at-home/patient/
%{__install} -d -m0755 %{buildroot}/%{_datadir}/hcw-at-home/patient/.well-known/
%{__cp} -a redhat/apple-app-site-association %{buildroot}/%{_datadir}/hcw-at-home/patient/.well-known/

%clean
%{__rm} -rf %{buildroot}

%files
%defattr(-,root,root, 0755)
%{_datadir}/hcw-at-home

%changelog
* Wed Apr 17 2019 Olivier Bitsch <olivier.b@iabsis.com>
- Initial spec file for hug-home-web package.
