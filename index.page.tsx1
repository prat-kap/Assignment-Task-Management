import Head from 'next/head';
import Link from 'next/link';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';

import { fetchGetBroker } from '@/services/fetchGetBroker';
import {
  fetchSearchBrokers,
  fetchAllBrokers
} from '@/services/fetchSearchBrokers';
import type {
  TBrokerSaved,
  TBrokerSearch,
  TBrokerSearchDisplayErrors,
  TBrokerSearchErrors,
  TFuncGetClassName,
  TFuncHandleCloseInstaEditModal,
  TFuncHandleCloseInstaEnableModal,
  TFuncHandleCloseInstaViewModal,
  TFuncHandleInputChange,
  TFuncHandleSearch,
  TFuncUpdateBrokersById,
  TFuncUpdateErrors,
  TFuncFormatValueForCSV,
  TFuncHandleExport,
  TFuncGetDate,
  TFuncPerformCSVExport
} from '@/types/gobal';
import type { RecursiveNullable, IGenericObjectInterface } from '@/utils/types';
import { getYupErrorsBySchema } from '@/utils/yup';
import { PrimaryCta } from '@rsa-digital/evo-shared-components/components/Cta';
import Field from '@rsa-digital/evo-shared-components/components/Form/Field';
import TextInput from '@rsa-digital/evo-shared-components/components/Form/TextInput';
import { Grid } from '@rsa-digital/evo-shared-components/components/Grid';
import GridItem from '@rsa-digital/evo-shared-components/components/Grid/GridItem';
import Modal from '@rsa-digital/evo-shared-components/components/Modal';
import LoadingOverlay from '@rsa-digital/evo-shared-components/components/LoadingOverlay';
import { ErrorPanel } from '@rsa-digital/evo-shared-components/components/Panel/StatusPanel';
import Table from '@rsa-digital/evo-shared-components/components/Table';
import TableCell from '@rsa-digital/evo-shared-components/components/Table/TableCell';
import React, { useCallback, useEffect, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import type * as yup from 'yup';

import PagesAdminBrokersEdit from '../edit/[editId]/index.page';
import PagesAdminBrokersEnable from '../enable/[enableId]/[action]/index.page';
import PagesAdminBrokersView from '../view/[viewId]/index.page';
import {
  brokerSearchFieldSet,
  brokerSearchSchema,
  initDisplayErrors,
  initFormErrors,
  initFormValues
} from './index.data';
import {
  buildSafeBrokerSearchPath,
  sanitizeBrokerSearchParams
} from './route';

export default function PagesAdminBrokersSearch() {
  const [formValues, setFormValues] = useState<TBrokerSearch>(initFormValues);
  const [formErrors, setFormErrors] =
    useState<TBrokerSearchErrors>(initFormErrors);
  const [displayErrors, setDisplayErrors] =
    useState<TBrokerSearchDisplayErrors>(initDisplayErrors);
  const [brokers, setBrokers] =
    useState<RecursiveNullable<Partial<TBrokerSaved>>[]>();
  const [prevSearchUrl, setPrevSearchUrl] = useState<string>('');
  const [displayInstaViewModal, setDisplayInstaViewModal] =
    useState<boolean>(false);
  const [displayInstaEditModal, setDisplayInstaEditModal] =
    useState<boolean>(false);
  const [displayInstaEnableModal, setDisplayInstaEnableModal] =
    useState<boolean>(false);
  const [isBackFromInstaModal, setIsBackFromInstaModal] =
    useState<boolean>(false);
  const [updatedBrokerId, setUpdatedBrokerId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router: NextRouter = useRouter();
  const pathname: string = usePathname();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
 
  const updateErrors: TFuncUpdateErrors = useCallback(async () => {
    const errors: IGenericObjectInterface<string> = await getYupErrorsBySchema(
      brokerSearchSchema,
      formValues
    );
    setFormErrors(errors as TBrokerSearchErrors);
  }, [formValues]);

  useEffect(() => {
    updateErrors();
  }, [updateErrors]);

  const hasFormErrors: boolean = Object.keys(formErrors).length !== 0;

  useEffect(() => {
    // query string to search form...
    for (const fieldName of brokerSearchFieldSet) {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: searchParams.get(fieldName)?.toString() || ''
      }));
    }
    // auto trigger search; no validation on params...
    const params: URLSearchParams = new URLSearchParams(searchParams);
    const safeParams: URLSearchParams = sanitizeBrokerSearchParams(params);
    const queryString: string = safeParams.toString();
    const shouldExport = safeParams.get('export') === 'true';

    if (
      !isBackFromInstaModal &&
      pathname === '/admin/brokers/search' &&
      queryString
    ) {
      fetchSearchBrokers(queryString).then((res) => {
        if ('data' in res) {
          setBrokers(res.data);
        }
      });
      const curUrl: string = buildSafeBrokerSearchPath(pathname, safeParams);
      setPrevSearchUrl(curUrl);
    }
    const getAllBrokers = async () => {
      setLoading(true);
      try {
        const res = await fetchAllBrokers();
        if ('data' in res) {
          setBrokers(undefined);
          if (shouldExport) {
            performCSVExport(res.data);
            params.delete('export');
            const nextUrl = buildSafeBrokerSearchPath(pathname, params);
            router.replace(nextUrl, undefined, {
              shallow: true
            });
          }
        }
      } finally {
        setLoading(false);
      }
    };
    if (
      isBackFromInstaModal &&
      pathname === '/admin/brokers/search' &&
      shouldExport
    ) {
      getAllBrokers();
    }
    setDisplayInstaViewModal(!!router.query.viewId);
    setDisplayInstaEditModal(!!router.query.editId);
    setDisplayInstaEnableModal(!!router.query.enableId);
  }, [
    isBackFromInstaModal,
    pathname,
    router.query.editId,
    router.query.enableId,
    router.query.viewId,
    searchParams
  ]);

  const handleChange: TFuncHandleInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      const { name, value } = event.currentTarget;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSearch: TFuncHandleSearch = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsBackFromInstaModal(false);

      if (!hasFormErrors) {
        const params: URLSearchParams = new URLSearchParams(searchParams);
        const currentUrl: string = buildSafeBrokerSearchPath(pathname, params);
        for (const fieldName of brokerSearchFieldSet) {
          params.set(fieldName, formValues[fieldName]);
        }
        const targetUrl: string = buildSafeBrokerSearchPath(pathname, params);

        if (currentUrl !== targetUrl) {
          setPrevSearchUrl(targetUrl);
          router.push(targetUrl);
        }
      } else {
        setBrokers(undefined);
        setDisplayErrors({
          '': true,
          firstName: true,
          lastName: true,
          brokerCompanyName: true,
          email: true,
          clientRef: true
        });
      }
    },
    [formValues, hasFormErrors, pathname, router, searchParams]
  );

  const updateBrokersById: TFuncUpdateBrokersById = (
    id: string,
    updatedBroker: RecursiveNullable<Partial<TBrokerSaved>>
  ) => {
    setUpdatedBrokerId(id);
    setBrokers((prev) =>
      prev?.map((broker) =>
        broker.id === id ? { ...broker, ...updatedBroker } : broker
      )
    );
    setTimeout(() => {
      setUpdatedBrokerId('');
    }, 3000);
  };

  const handleCloseInstaViewModal: TFuncHandleCloseInstaViewModal =
    useCallback(() => {
      setIsBackFromInstaModal(true);
      router.push(prevSearchUrl, undefined, { scroll: false });
    }, [prevSearchUrl, router]);

  const handleCloseInstaEnableModal: TFuncHandleCloseInstaEnableModal =
    useCallback(() => {
      // update the updated record alone...
      const brokerId: string = router.query.enableId as string;
      fetchGetBroker(brokerId).then((res) => {
        if ('data' in res && res.data) {
          updateBrokersById(brokerId, res.data);
        }
      });

      setIsBackFromInstaModal(true);
      router.push(prevSearchUrl, undefined, { scroll: false });
    }, [prevSearchUrl, router]);

  const handleCloseInstaEditModal: TFuncHandleCloseInstaEditModal =
    useCallback(async () => {
      // update the edited record alone...
      const brokerId: string = router.query.editId as string;
      fetchGetBroker(brokerId).then((res) => {
        if ('data' in res && res.data) {
          updateBrokersById(brokerId, res.data);
        }
      });

      setIsBackFromInstaModal(true);
      router.push(prevSearchUrl, undefined, { scroll: false });
    }, [prevSearchUrl, router]);

  const getClassName: TFuncGetClassName = useCallback(
    (
      brokerId: string | null | undefined,
      isbrokerEnabled: boolean | null | undefined
    ) => {
      const classNames: string[] = [];
      if (brokerId === updatedBrokerId) {
        classNames.push('highlighted');
      }
      if (!isbrokerEnabled) {
        classNames.push('disabled');
      }
      return classNames.join(' ');
    },
    [updatedBrokerId]
  );

  const formatDate: TFuncGetDate = useCallback(
    (dateTime: string | null | undefined) => {
      const date = dateTime?.split('T')[0].split('-');
      if (date) {
        return `${date[2]}/${date[1]}/${date[0]}`;
      }
    },
    []
  );

  const formatValueForCSV: TFuncFormatValueForCSV = useCallback(
    (fieldName: string, value: Record<string, any>) => {
      switch (fieldName) {
        case 'accountEnabled':
          return value.accountEnabled ? 'Active' : 'Inactive';
        case 'createdDateTime':
          return `="${formatDate(value.createdDateTime)}"`; // To show the value as text to avoid getting ## in CSV
        case 'mobileNumber':
          return `="${value.mobileNumber}"`; // To show mobile number as text to avoid trailing zeroes in CSV
        default:
          return '';
      }
    },
    []
  );

  const performCSVExport: TFuncPerformCSVExport = useCallback(
    (data: any[] | undefined) => {
      const fieldMap = {
        accountEnabled: 'Active / Inactive',
        createdDateTime: 'Registration Date',
        parentBrokerId: 'Parent Broker ID',
        clientRef: 'Client Ref',
        firstName: 'First Name',
        lastName: 'Last Name',
        brokerCompanyName: 'Broker Company Name',
        mobileNumber: 'Mobile Number',
        email: 'Email Address',
        pincode: 'Postcode'
      };
      const headerFields = Object.keys(fieldMap);
      const headerFieldsMapping = Object.values(fieldMap);
      const csvRows: string[] = [];
      // Header fields to show in CSV file
      csvRows.push(headerFieldsMapping.join(','));
      if (data) {
        // Data rows in CSV file
        for (const row of data) {
          const values = headerFields.map((field) => {
            const rawValue = row as Record<string, any>[typeof field];
            let formattedValue = '';
            if (
              field === 'accountEnabled' ||
              field === 'createdDateTime' ||
              field === 'mobileNumber'
            ) {
              formattedValue = formatValueForCSV(field, rawValue);
            } else
              formattedValue = JSON.stringify(
                (row as Record<string, any>)[field] || ''
              );
            return formattedValue;
          });
          csvRows.push(values.join(','));
        }

        // Create Blob and download in CSV format
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Broker_data.csv';
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    [brokers]
  );

  const handleExport: TFuncHandleExport = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (hasFormErrors) {
        const params = new URLSearchParams();
        params.set('export', 'true');
        const targetUrl = buildSafeBrokerSearchPath(pathname, params);
        setIsBackFromInstaModal(true);
        router.push(targetUrl);
      } else {
        setIsBackFromInstaModal(false);
      }
      if (brokers) {
        performCSVExport(brokers);
      }
    },
    [brokers, isBackFromInstaModal, hasFormErrors, router, pathname]
  );

  return (
    <>
      <Head>
        <title>Search Brokers</title>
      </Head>
      {loading ? (
        <LoadingOverlay
          loadingMessage={'Exporting broker data, please wait...'}
        ></LoadingOverlay>
      ) : (
        <Grid>
          <GridItem desktop={12} tabletLandscape={8} tabletPortrait={8}>
            <h1>Search Brokers</h1>
            <Grid>
              {displayErrors[''] && formErrors[''] && (
                <GridItem desktop={12} tabletLandscape={8} tabletPortrait={8}>
                  {/* @ts-expect-error -- As children prop is erroneously missing in the lib type */}
                  <ErrorPanel>
                    <p>{formErrors['']}</p>
                  </ErrorPanel>
                </GridItem>
              )}
              {brokerSearchFieldSet.map((fieldName) => (
                <GridItem
                  key={fieldName}
                  desktop={6}
                  tabletLandscape={8}
                  tabletPortrait={8}
                >
                  <React.Fragment key={fieldName}>
                    <Field
                      label={`${
                        (
                          brokerSearchSchema.describe().fields[
                            fieldName
                          ] as yup.SchemaDescription
                        )?.label
                      }`}
                      errorText={
                        displayErrors[fieldName] ? formErrors[fieldName] : ''
                      }
                      alignLeft
                    >
                      <TextInput
                        id={fieldName}
                        name={fieldName}
                        value={formValues[fieldName]}
                        loading={false}
                        type={fieldName.includes('email') ? 'email' : 'text'}
                        onChange={handleChange}
                      />
                    </Field>
                  </React.Fragment>
                </GridItem>
              ))}
              <GridItem desktop={2} tabletLandscape={8} tabletPortrait={8}>
                <Field label="" alignLeft>
                  <PrimaryCta
                    cta={{
                      onClick: handleSearch,
                      displayText: 'Search',
                      screenReaderText: 'Search',
                      openInNewTab: false
                    }}
                    arrowDirection={'right'}
                  />
                </Field>
              </GridItem>
              <GridItem desktop={4} tabletLandscape={8} tabletPortrait={8}>
                <Field label="" alignLeft>
                  <PrimaryCta
                    cta={{
                      onClick: handleExport,
                      displayText: 'Export',
                      screenReaderText: 'Export',
                      openInNewTab: false
                    }}
                    arrowDirection={'right'}
                  />
                </Field>
              </GridItem>
            </Grid>
            <Table>
              <thead>
                <tr>
                  <TableCell width={100} isHeader>
                    View
                  </TableCell>
                  <TableCell width={100} isHeader>
                    Edit
                  </TableCell>
                  <TableCell width={120} isHeader>
                    Active / Inactive
                  </TableCell>
                  <TableCell width={200} isHeader>
                    Registration Date
                  </TableCell>
                  <TableCell width={200} isHeader>
                    Parent Broker ID
                  </TableCell>
                  <TableCell width={200} isHeader>
                    Client ref.
                  </TableCell>
                  <TableCell width={200} isHeader>
                    First name
                  </TableCell>
                  <TableCell width={200} isHeader>
                    Last name
                  </TableCell>
                  <TableCell width={200} isHeader>
                    Broker company name
                  </TableCell>
                  <TableCell width={200} isHeader>
                    Mobile number
                  </TableCell>
                  <TableCell width={500} isHeader>
                    Email address
                  </TableCell>
                  <TableCell width={200} isHeader>
                    Postcode
                  </TableCell>
                </tr>
              </thead>
              <tbody>
                {!brokers?.length ? (
                  <tr>
                    <TableCell
                      colSpan={12}
                      height={300}
                      className="tbl-error-msg"
                    >
                      No matching search results. Can you please provide more
                      details to search?
                    </TableCell>
                  </tr>
                ) : (
                  brokers.map((broker) => (
                    <tr
                      key={broker.id}
                      className={getClassName(broker.id, broker.accountEnabled)}
                    >
                      <TableCell highlight>
                        <Link
                          href={{
                            pathname: router.pathname,
                            query: {
                              ...router.query,
                              viewId: broker.id
                            }
                          }}
                          as={`/admin/brokers/view/${broker.id}`}
                          scroll={false}
                          className="primary-link"
                        >
                          View
                        </Link>
                      </TableCell>
                      <TableCell highlight>
                        <Link
                          href={{
                            pathname: router.pathname,
                            query: {
                              ...router.query,
                              editId: broker.id
                            }
                          }}
                          as={`/admin/brokers/edit/${broker.id}`}
                          scroll={false}
                          className="primary-link"
                        >
                          Edit
                        </Link>
                      </TableCell>
                      <TableCell highlight>
                        <Link
                          href={{
                            pathname: router.pathname,
                            query: {
                              ...router.query,
                              enableId: broker.id,
                              action: broker.accountEnabled
                                ? 'disable'
                                : 'enable'
                            }
                          }}
                          as={`/admin/brokers/enable/${broker.id}/${
                            broker.accountEnabled ? 'disable' : 'enable'
                          }`}
                          scroll={false}
                          className="primary-link"
                        >
                          {broker.accountEnabled ? 'Active' : 'Inactive'}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {formatDate(broker?.createdDateTime)}
                      </TableCell>
                      <TableCell>{broker.parentBrokerId || ''}</TableCell>
                      <TableCell>{broker.clientRef || ''}</TableCell>
                      <TableCell>{broker.firstName}</TableCell>
                      <TableCell>{broker.lastName}</TableCell>
                      <TableCell>{broker.brokerCompanyName}</TableCell>
                      <TableCell>{broker.mobileNumber}</TableCell>
                      <TableCell>{broker.email}</TableCell>
                      <TableCell>{broker.pincode}</TableCell>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            <p>&nbsp;</p>
          </GridItem>
        </Grid>
      )}
      {displayInstaViewModal && (
        <Modal
          gridItemProps={{ desktop: 12, tabletLandscape: 8, tabletPortrait: 8 }}
          onClose={handleCloseInstaViewModal}
        >
          <PagesAdminBrokersView />
        </Modal>
      )}
      {displayInstaEditModal && (
        <Modal
          gridItemProps={{ desktop: 12, tabletLandscape: 8, tabletPortrait: 8 }}
          onClose={handleCloseInstaEditModal}
        >
          <PagesAdminBrokersEdit closeModal={handleCloseInstaEditModal} />
        </Modal>
      )}
      {displayInstaEnableModal && (
        <Modal
          gridItemProps={{ desktop: 12, tabletLandscape: 8, tabletPortrait: 8 }}
          onClose={handleCloseInstaEnableModal}
        >
          <PagesAdminBrokersEnable closeModal={handleCloseInstaEnableModal} />
        </Modal>
      )}
    </>
  );
}
