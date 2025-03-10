import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    Date: any;
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    DateTime: any;
    /** A string used to identify an i18n locale */
    I18NLocaleCode: any;
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: any;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};

export type Blog = {
    __typename?: 'Blog';
    title?: Maybe<Scalars['String']>;
    body?: Maybe<Scalars['String']>;
    viewCount?: Maybe<Scalars['Int']>;
    coverImage?: Maybe<UploadFileEntityResponse>;
    user?: Maybe<UsersPermissionsUserEntityResponse>;
    slug?: Maybe<Scalars['String']>;
    category?: Maybe<Scalars['JSON']>;
    status?: Maybe<Enum_Blog_Status>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    localizations?: Maybe<BlogRelationResponseCollection>;
    locale?: Maybe<Scalars['String']>;
};

export type BlogLocalizationsArgs = {
    filters?: Maybe<BlogFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type BlogEntity = {
    __typename?: 'BlogEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Blog>;
};

export type BlogEntityResponse = {
    __typename?: 'BlogEntityResponse';
    data?: Maybe<BlogEntity>;
};

export type BlogEntityResponseCollection = {
    __typename?: 'BlogEntityResponseCollection';
    data: Array<BlogEntity>;
    meta: ResponseCollectionMeta;
};

export type BlogFiltersInput = {
    id?: Maybe<IdFilterInput>;
    title?: Maybe<StringFilterInput>;
    body?: Maybe<StringFilterInput>;
    viewCount?: Maybe<IntFilterInput>;
    user?: Maybe<UsersPermissionsUserFiltersInput>;
    slug?: Maybe<StringFilterInput>;
    category?: Maybe<JsonFilterInput>;
    status?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    localizations?: Maybe<BlogFiltersInput>;
    locale?: Maybe<StringFilterInput>;
    and?: Maybe<Array<Maybe<BlogFiltersInput>>>;
    or?: Maybe<Array<Maybe<BlogFiltersInput>>>;
    not?: Maybe<BlogFiltersInput>;
};

export type BlogInput = {
    title?: Maybe<Scalars['String']>;
    body?: Maybe<Scalars['String']>;
    viewCount?: Maybe<Scalars['Int']>;
    coverImage?: Maybe<Scalars['ID']>;
    user?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['String']>;
    category?: Maybe<Scalars['JSON']>;
    status?: Maybe<Enum_Blog_Status>;
};

export type BlogRelationResponseCollection = {
    __typename?: 'BlogRelationResponseCollection';
    data: Array<BlogEntity>;
};

export type BookmarkedCourse = {
    __typename?: 'BookmarkedCourse';
    user?: Maybe<UsersPermissionsUserEntityResponse>;
    course?: Maybe<CourseEntityResponse>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BookmarkedCourseEntity = {
    __typename?: 'BookmarkedCourseEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<BookmarkedCourse>;
};

export type BookmarkedCourseEntityResponse = {
    __typename?: 'BookmarkedCourseEntityResponse';
    data?: Maybe<BookmarkedCourseEntity>;
};

export type BookmarkedCourseEntityResponseCollection = {
    __typename?: 'BookmarkedCourseEntityResponseCollection';
    data: Array<BookmarkedCourseEntity>;
    meta: ResponseCollectionMeta;
};

export type BookmarkedCourseFiltersInput = {
    id?: Maybe<IdFilterInput>;
    user?: Maybe<UsersPermissionsUserFiltersInput>;
    course?: Maybe<CourseFiltersInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<BookmarkedCourseFiltersInput>>>;
    or?: Maybe<Array<Maybe<BookmarkedCourseFiltersInput>>>;
    not?: Maybe<BookmarkedCourseFiltersInput>;
};

export type BookmarkedCourseInput = {
    user?: Maybe<Scalars['ID']>;
    course?: Maybe<Scalars['ID']>;
};

export type BookmarkedCourseRelationResponseCollection = {
    __typename?: 'BookmarkedCourseRelationResponseCollection';
    data: Array<BookmarkedCourseEntity>;
};

export type BooleanFilterInput = {
    and?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
    or?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
    not?: Maybe<BooleanFilterInput>;
    eq?: Maybe<Scalars['Boolean']>;
    eqi?: Maybe<Scalars['Boolean']>;
    ne?: Maybe<Scalars['Boolean']>;
    startsWith?: Maybe<Scalars['Boolean']>;
    endsWith?: Maybe<Scalars['Boolean']>;
    contains?: Maybe<Scalars['Boolean']>;
    notContains?: Maybe<Scalars['Boolean']>;
    containsi?: Maybe<Scalars['Boolean']>;
    notContainsi?: Maybe<Scalars['Boolean']>;
    gt?: Maybe<Scalars['Boolean']>;
    gte?: Maybe<Scalars['Boolean']>;
    lt?: Maybe<Scalars['Boolean']>;
    lte?: Maybe<Scalars['Boolean']>;
    null?: Maybe<Scalars['Boolean']>;
    notNull?: Maybe<Scalars['Boolean']>;
    in?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
    notIn?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
    between?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
};

export type Broadcast = {
    __typename?: 'Broadcast';
    title: Scalars['String'];
    coverImage: UploadFileEntityResponse;
    category?: Maybe<Scalars['JSON']>;
    slug: Scalars['String'];
    videoId?: Maybe<Scalars['String']>;
    broadcast_sery?: Maybe<BroadcastSerieEntityResponse>;
    status?: Maybe<Enum_Broadcast_Status>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    localizations?: Maybe<BroadcastRelationResponseCollection>;
    locale?: Maybe<Scalars['String']>;
};

export type BroadcastLocalizationsArgs = {
    filters?: Maybe<BroadcastFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type BroadcastEntity = {
    __typename?: 'BroadcastEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Broadcast>;
};

export type BroadcastEntityResponse = {
    __typename?: 'BroadcastEntityResponse';
    data?: Maybe<BroadcastEntity>;
};

export type BroadcastEntityResponseCollection = {
    __typename?: 'BroadcastEntityResponseCollection';
    data: Array<BroadcastEntity>;
    meta: ResponseCollectionMeta;
};

export type BroadcastFiltersInput = {
    id?: Maybe<IdFilterInput>;
    title?: Maybe<StringFilterInput>;
    category?: Maybe<JsonFilterInput>;
    slug?: Maybe<StringFilterInput>;
    videoId?: Maybe<StringFilterInput>;
    broadcast_sery?: Maybe<BroadcastSerieFiltersInput>;
    status?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    localizations?: Maybe<BroadcastFiltersInput>;
    locale?: Maybe<StringFilterInput>;
    and?: Maybe<Array<Maybe<BroadcastFiltersInput>>>;
    or?: Maybe<Array<Maybe<BroadcastFiltersInput>>>;
    not?: Maybe<BroadcastFiltersInput>;
};

export type BroadcastInput = {
    title?: Maybe<Scalars['String']>;
    coverImage?: Maybe<Scalars['ID']>;
    category?: Maybe<Scalars['JSON']>;
    slug?: Maybe<Scalars['String']>;
    videoId?: Maybe<Scalars['String']>;
    broadcast_sery?: Maybe<Scalars['ID']>;
    status?: Maybe<Enum_Broadcast_Status>;
};

export type BroadcastRelationResponseCollection = {
    __typename?: 'BroadcastRelationResponseCollection';
    data: Array<BroadcastEntity>;
};

export type BroadcastSerie = {
    __typename?: 'BroadcastSerie';
    title: Scalars['String'];
    broadcasts?: Maybe<BroadcastRelationResponseCollection>;
    slug?: Maybe<Scalars['String']>;
    totalMinutes?: Maybe<Scalars['Int']>;
    coverImage: UploadFileEntityResponse;
    status?: Maybe<Enum_Broadcastserie_Status>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    localizations?: Maybe<BroadcastSerieRelationResponseCollection>;
    locale?: Maybe<Scalars['String']>;
};

export type BroadcastSerieBroadcastsArgs = {
    filters?: Maybe<BroadcastFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type BroadcastSerieLocalizationsArgs = {
    filters?: Maybe<BroadcastSerieFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type BroadcastSerieEntity = {
    __typename?: 'BroadcastSerieEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<BroadcastSerie>;
};

export type BroadcastSerieEntityResponse = {
    __typename?: 'BroadcastSerieEntityResponse';
    data?: Maybe<BroadcastSerieEntity>;
};

export type BroadcastSerieEntityResponseCollection = {
    __typename?: 'BroadcastSerieEntityResponseCollection';
    data: Array<BroadcastSerieEntity>;
    meta: ResponseCollectionMeta;
};

export type BroadcastSerieFiltersInput = {
    id?: Maybe<IdFilterInput>;
    title?: Maybe<StringFilterInput>;
    broadcasts?: Maybe<BroadcastFiltersInput>;
    slug?: Maybe<StringFilterInput>;
    totalMinutes?: Maybe<IntFilterInput>;
    status?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    localizations?: Maybe<BroadcastSerieFiltersInput>;
    locale?: Maybe<StringFilterInput>;
    and?: Maybe<Array<Maybe<BroadcastSerieFiltersInput>>>;
    or?: Maybe<Array<Maybe<BroadcastSerieFiltersInput>>>;
    not?: Maybe<BroadcastSerieFiltersInput>;
};

export type BroadcastSerieInput = {
    title?: Maybe<Scalars['String']>;
    broadcasts?: Maybe<Array<Maybe<Scalars['ID']>>>;
    slug?: Maybe<Scalars['String']>;
    totalMinutes?: Maybe<Scalars['Int']>;
    coverImage?: Maybe<Scalars['ID']>;
    status?: Maybe<Enum_Broadcastserie_Status>;
};

export type BroadcastSerieRelationResponseCollection = {
    __typename?: 'BroadcastSerieRelationResponseCollection';
    data: Array<BroadcastSerieEntity>;
};

export type Callback = {
    __typename?: 'Callback';
    phoneNumber: Scalars['String'];
    isCalled?: Maybe<Scalars['Boolean']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CallbackEntity = {
    __typename?: 'CallbackEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Callback>;
};

export type CallbackEntityResponse = {
    __typename?: 'CallbackEntityResponse';
    data?: Maybe<CallbackEntity>;
};

export type CallbackEntityResponseCollection = {
    __typename?: 'CallbackEntityResponseCollection';
    data: Array<CallbackEntity>;
    meta: ResponseCollectionMeta;
};

export type CallbackFiltersInput = {
    id?: Maybe<IdFilterInput>;
    phoneNumber?: Maybe<StringFilterInput>;
    isCalled?: Maybe<BooleanFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<CallbackFiltersInput>>>;
    or?: Maybe<Array<Maybe<CallbackFiltersInput>>>;
    not?: Maybe<CallbackFiltersInput>;
};

export type CallbackInput = {
    phoneNumber?: Maybe<Scalars['String']>;
    isCalled?: Maybe<Scalars['Boolean']>;
};

export type Consulting = {
    __typename?: 'Consulting';
    name?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ConsultingEntity = {
    __typename?: 'ConsultingEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Consulting>;
};

export type ConsultingEntityResponse = {
    __typename?: 'ConsultingEntityResponse';
    data?: Maybe<ConsultingEntity>;
};

export type ConsultingEntityResponseCollection = {
    __typename?: 'ConsultingEntityResponseCollection';
    data: Array<ConsultingEntity>;
    meta: ResponseCollectionMeta;
};

export type ConsultingFiltersInput = {
    id?: Maybe<IdFilterInput>;
    name?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<ConsultingFiltersInput>>>;
    or?: Maybe<Array<Maybe<ConsultingFiltersInput>>>;
    not?: Maybe<ConsultingFiltersInput>;
};

export type ConsultingInput = {
    name?: Maybe<Scalars['String']>;
};

export type Course = {
    __typename?: 'Course';
    isActive: Scalars['Boolean'];
    name: Scalars['String'];
    category: Enum_Course_Category;
    price: Scalars['Float'];
    capacity: Scalars['Int'];
    trainers?: Maybe<TrainerRelationResponseCollection>;
    groups?: Maybe<GroupRelationResponseCollection>;
    description: Scalars['String'];
    availableProficiencies?: Maybe<Scalars['JSON']>;
    benefits?: Maybe<Scalars['JSON']>;
    syllabus?: Maybe<Scalars['JSON']>;
    durationType: Enum_Course_Durationtype;
    count: Scalars['Int'];
    duration: Scalars['Int'];
    users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
    status?: Maybe<Enum_Course_Status>;
    courseImage?: Maybe<UploadFileEntityResponse>;
    includedPayment?: Maybe<Scalars['JSON']>;
    bookmarked_courses?: Maybe<BookmarkedCourseRelationResponseCollection>;
    message?: Maybe<MessageEntityResponse>;
    videoId?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CourseTrainersArgs = {
    filters?: Maybe<TrainerFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CourseGroupsArgs = {
    filters?: Maybe<GroupFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CourseUsersArgs = {
    filters?: Maybe<UsersPermissionsUserFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CourseBookmarked_CoursesArgs = {
    filters?: Maybe<BookmarkedCourseFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CourseEntity = {
    __typename?: 'CourseEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Course>;
};

export type CourseEntityResponse = {
    __typename?: 'CourseEntityResponse';
    data?: Maybe<CourseEntity>;
};

export type CourseEntityResponseCollection = {
    __typename?: 'CourseEntityResponseCollection';
    data: Array<CourseEntity>;
    meta: ResponseCollectionMeta;
};

export type CourseFiltersInput = {
    id?: Maybe<IdFilterInput>;
    isActive?: Maybe<BooleanFilterInput>;
    name?: Maybe<StringFilterInput>;
    category?: Maybe<StringFilterInput>;
    price?: Maybe<FloatFilterInput>;
    capacity?: Maybe<IntFilterInput>;
    trainers?: Maybe<TrainerFiltersInput>;
    groups?: Maybe<GroupFiltersInput>;
    description?: Maybe<StringFilterInput>;
    availableProficiencies?: Maybe<JsonFilterInput>;
    benefits?: Maybe<JsonFilterInput>;
    syllabus?: Maybe<JsonFilterInput>;
    durationType?: Maybe<StringFilterInput>;
    count?: Maybe<IntFilterInput>;
    duration?: Maybe<IntFilterInput>;
    users?: Maybe<UsersPermissionsUserFiltersInput>;
    status?: Maybe<StringFilterInput>;
    includedPayment?: Maybe<JsonFilterInput>;
    bookmarked_courses?: Maybe<BookmarkedCourseFiltersInput>;
    message?: Maybe<MessageFiltersInput>;
    videoId?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<CourseFiltersInput>>>;
    or?: Maybe<Array<Maybe<CourseFiltersInput>>>;
    not?: Maybe<CourseFiltersInput>;
};

export type CourseInput = {
    isActive?: Maybe<Scalars['Boolean']>;
    name?: Maybe<Scalars['String']>;
    category?: Maybe<Enum_Course_Category>;
    price?: Maybe<Scalars['Float']>;
    capacity?: Maybe<Scalars['Int']>;
    trainers?: Maybe<Array<Maybe<Scalars['ID']>>>;
    groups?: Maybe<Array<Maybe<Scalars['ID']>>>;
    description?: Maybe<Scalars['String']>;
    availableProficiencies?: Maybe<Scalars['JSON']>;
    benefits?: Maybe<Scalars['JSON']>;
    syllabus?: Maybe<Scalars['JSON']>;
    durationType?: Maybe<Enum_Course_Durationtype>;
    count?: Maybe<Scalars['Int']>;
    duration?: Maybe<Scalars['Int']>;
    users?: Maybe<Array<Maybe<Scalars['ID']>>>;
    status?: Maybe<Enum_Course_Status>;
    courseImage?: Maybe<Scalars['ID']>;
    includedPayment?: Maybe<Scalars['JSON']>;
    bookmarked_courses?: Maybe<Array<Maybe<Scalars['ID']>>>;
    message?: Maybe<Scalars['ID']>;
    videoId?: Maybe<Scalars['String']>;
};

export type CourseRegister = {
    __typename?: 'CourseRegister';
    user?: Maybe<UsersPermissionsUserEntityResponse>;
    group?: Maybe<GroupEntityResponse>;
    paymentStatus?: Maybe<Enum_Courseregister_Paymentstatus>;
    status?: Maybe<Enum_Courseregister_Status>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CourseRegisterEntity = {
    __typename?: 'CourseRegisterEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<CourseRegister>;
};

export type CourseRegisterEntityResponse = {
    __typename?: 'CourseRegisterEntityResponse';
    data?: Maybe<CourseRegisterEntity>;
};

export type CourseRegisterEntityResponseCollection = {
    __typename?: 'CourseRegisterEntityResponseCollection';
    data: Array<CourseRegisterEntity>;
    meta: ResponseCollectionMeta;
};

export type CourseRegisterFiltersInput = {
    id?: Maybe<IdFilterInput>;
    user?: Maybe<UsersPermissionsUserFiltersInput>;
    group?: Maybe<GroupFiltersInput>;
    paymentStatus?: Maybe<StringFilterInput>;
    status?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<CourseRegisterFiltersInput>>>;
    or?: Maybe<Array<Maybe<CourseRegisterFiltersInput>>>;
    not?: Maybe<CourseRegisterFiltersInput>;
};

export type CourseRegisterInput = {
    user?: Maybe<Scalars['ID']>;
    group?: Maybe<Scalars['ID']>;
    paymentStatus?: Maybe<Enum_Courseregister_Paymentstatus>;
    status?: Maybe<Enum_Courseregister_Status>;
};

export type CourseRegisterRelationResponseCollection = {
    __typename?: 'CourseRegisterRelationResponseCollection';
    data: Array<CourseRegisterEntity>;
};

export type CourseRelationResponseCollection = {
    __typename?: 'CourseRelationResponseCollection';
    data: Array<CourseEntity>;
};

export type DateFilterInput = {
    and?: Maybe<Array<Maybe<Scalars['Date']>>>;
    or?: Maybe<Array<Maybe<Scalars['Date']>>>;
    not?: Maybe<DateFilterInput>;
    eq?: Maybe<Scalars['Date']>;
    eqi?: Maybe<Scalars['Date']>;
    ne?: Maybe<Scalars['Date']>;
    startsWith?: Maybe<Scalars['Date']>;
    endsWith?: Maybe<Scalars['Date']>;
    contains?: Maybe<Scalars['Date']>;
    notContains?: Maybe<Scalars['Date']>;
    containsi?: Maybe<Scalars['Date']>;
    notContainsi?: Maybe<Scalars['Date']>;
    gt?: Maybe<Scalars['Date']>;
    gte?: Maybe<Scalars['Date']>;
    lt?: Maybe<Scalars['Date']>;
    lte?: Maybe<Scalars['Date']>;
    null?: Maybe<Scalars['Boolean']>;
    notNull?: Maybe<Scalars['Boolean']>;
    in?: Maybe<Array<Maybe<Scalars['Date']>>>;
    notIn?: Maybe<Array<Maybe<Scalars['Date']>>>;
    between?: Maybe<Array<Maybe<Scalars['Date']>>>;
};

export type DateTimeFilterInput = {
    and?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
    or?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
    not?: Maybe<DateTimeFilterInput>;
    eq?: Maybe<Scalars['DateTime']>;
    eqi?: Maybe<Scalars['DateTime']>;
    ne?: Maybe<Scalars['DateTime']>;
    startsWith?: Maybe<Scalars['DateTime']>;
    endsWith?: Maybe<Scalars['DateTime']>;
    contains?: Maybe<Scalars['DateTime']>;
    notContains?: Maybe<Scalars['DateTime']>;
    containsi?: Maybe<Scalars['DateTime']>;
    notContainsi?: Maybe<Scalars['DateTime']>;
    gt?: Maybe<Scalars['DateTime']>;
    gte?: Maybe<Scalars['DateTime']>;
    lt?: Maybe<Scalars['DateTime']>;
    lte?: Maybe<Scalars['DateTime']>;
    null?: Maybe<Scalars['Boolean']>;
    notNull?: Maybe<Scalars['Boolean']>;
    in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
    notIn?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
    between?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
};

export enum Enum_Blog_Status {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}

export enum Enum_Broadcastserie_Status {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}

export enum Enum_Broadcast_Status {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}

export enum Enum_Courseregister_Paymentstatus {
    PaidByCash = 'PAID_BY_CASH',
    Paid = 'PAID',
}

export enum Enum_Courseregister_Status {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}

export enum Enum_Course_Category {
    Management = 'MANAGEMENT',
    Sales = 'SALES',
    Marketing = 'MARKETING',
    Satacademy = 'SATACADEMY',
    Nartio = 'NARTIO',
    Others = 'OTHERS',
}

export enum Enum_Course_Durationtype {
    Day = 'DAY',
    Week = 'WEEK',
    Month = 'MONTH',
}

export enum Enum_Course_Status {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}

export enum Enum_Employee_Status {
    Active = 'ACTIVE',
    Deactive = 'DEACTIVE',
}

export enum Enum_Group_Status {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}

export enum Enum_Message_Type {
    Course = 'COURSE',
    Consulting = 'CONSULTING',
}

export enum Enum_Trainer_Gender {
    Male = 'MALE',
    Female = 'FEMALE',
}

export enum Enum_Trainer_Status {
    Active = 'ACTIVE',
    Deactive = 'DEACTIVE',
}

export enum Enum_Transaction_Currency {
    Azn = 'AZN',
}

export enum Enum_Transaction_Status {
    Pending = 'PENDING',
    Approved = 'APPROVED',
    Canceled = 'CANCELED',
    Declined = 'DECLINED',
}

export enum Enum_Video_Status {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}

export type Employee = {
    __typename?: 'Employee';
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    position: Scalars['String'];
    status?: Maybe<Enum_Employee_Status>;
    image?: Maybe<UploadFileEntityResponse>;
    rank?: Maybe<Scalars['Int']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EmployeeEntity = {
    __typename?: 'EmployeeEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Employee>;
};

export type EmployeeEntityResponse = {
    __typename?: 'EmployeeEntityResponse';
    data?: Maybe<EmployeeEntity>;
};

export type EmployeeEntityResponseCollection = {
    __typename?: 'EmployeeEntityResponseCollection';
    data: Array<EmployeeEntity>;
    meta: ResponseCollectionMeta;
};

export type EmployeeFiltersInput = {
    id?: Maybe<IdFilterInput>;
    firstName?: Maybe<StringFilterInput>;
    lastName?: Maybe<StringFilterInput>;
    position?: Maybe<StringFilterInput>;
    status?: Maybe<StringFilterInput>;
    rank?: Maybe<IntFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<EmployeeFiltersInput>>>;
    or?: Maybe<Array<Maybe<EmployeeFiltersInput>>>;
    not?: Maybe<EmployeeFiltersInput>;
};

export type EmployeeInput = {
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    position?: Maybe<Scalars['String']>;
    status?: Maybe<Enum_Employee_Status>;
    image?: Maybe<Scalars['ID']>;
    rank?: Maybe<Scalars['Int']>;
};

export type FileInfoInput = {
    name?: Maybe<Scalars['String']>;
    alternativeText?: Maybe<Scalars['String']>;
    caption?: Maybe<Scalars['String']>;
};

export type FloatFilterInput = {
    and?: Maybe<Array<Maybe<Scalars['Float']>>>;
    or?: Maybe<Array<Maybe<Scalars['Float']>>>;
    not?: Maybe<FloatFilterInput>;
    eq?: Maybe<Scalars['Float']>;
    eqi?: Maybe<Scalars['Float']>;
    ne?: Maybe<Scalars['Float']>;
    startsWith?: Maybe<Scalars['Float']>;
    endsWith?: Maybe<Scalars['Float']>;
    contains?: Maybe<Scalars['Float']>;
    notContains?: Maybe<Scalars['Float']>;
    containsi?: Maybe<Scalars['Float']>;
    notContainsi?: Maybe<Scalars['Float']>;
    gt?: Maybe<Scalars['Float']>;
    gte?: Maybe<Scalars['Float']>;
    lt?: Maybe<Scalars['Float']>;
    lte?: Maybe<Scalars['Float']>;
    null?: Maybe<Scalars['Boolean']>;
    notNull?: Maybe<Scalars['Boolean']>;
    in?: Maybe<Array<Maybe<Scalars['Float']>>>;
    notIn?: Maybe<Array<Maybe<Scalars['Float']>>>;
    between?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export enum Gender {
    Male = 'MALE',
    Female = 'FEMALE',
}

export type GenericMorph =
    | UploadFile
    | UploadFolder
    | I18NLocale
    | UsersPermissionsPermission
    | UsersPermissionsRole
    | UsersPermissionsUser
    | Blog
    | BookmarkedCourse
    | Broadcast
    | BroadcastSerie
    | Callback
    | Consulting
    | Course
    | CourseRegister
    | Employee
    | Group
    | Message
    | SliderShow
    | Subscriber
    | Trainer
    | Transaction
    | Video;

export type Group = {
    __typename?: 'Group';
    isActive: Scalars['Boolean'];
    name: Scalars['String'];
    startsAt?: Maybe<Scalars['Date']>;
    endsAt?: Maybe<Scalars['Date']>;
    course?: Maybe<CourseEntityResponse>;
    transactions?: Maybe<TransactionRelationResponseCollection>;
    course_registers?: Maybe<CourseRegisterRelationResponseCollection>;
    capacity: Scalars['Int'];
    status?: Maybe<Enum_Group_Status>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GroupTransactionsArgs = {
    filters?: Maybe<TransactionFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GroupCourse_RegistersArgs = {
    filters?: Maybe<CourseRegisterFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GroupEntity = {
    __typename?: 'GroupEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Group>;
};

export type GroupEntityResponse = {
    __typename?: 'GroupEntityResponse';
    data?: Maybe<GroupEntity>;
};

export type GroupEntityResponseCollection = {
    __typename?: 'GroupEntityResponseCollection';
    data: Array<GroupEntity>;
    meta: ResponseCollectionMeta;
};

export type GroupFiltersInput = {
    id?: Maybe<IdFilterInput>;
    isActive?: Maybe<BooleanFilterInput>;
    name?: Maybe<StringFilterInput>;
    startsAt?: Maybe<DateFilterInput>;
    endsAt?: Maybe<DateFilterInput>;
    course?: Maybe<CourseFiltersInput>;
    transactions?: Maybe<TransactionFiltersInput>;
    course_registers?: Maybe<CourseRegisterFiltersInput>;
    capacity?: Maybe<IntFilterInput>;
    status?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<GroupFiltersInput>>>;
    or?: Maybe<Array<Maybe<GroupFiltersInput>>>;
    not?: Maybe<GroupFiltersInput>;
};

export type GroupInput = {
    isActive?: Maybe<Scalars['Boolean']>;
    name?: Maybe<Scalars['String']>;
    startsAt?: Maybe<Scalars['Date']>;
    endsAt?: Maybe<Scalars['Date']>;
    course?: Maybe<Scalars['ID']>;
    transactions?: Maybe<Array<Maybe<Scalars['ID']>>>;
    course_registers?: Maybe<Array<Maybe<Scalars['ID']>>>;
    capacity?: Maybe<Scalars['Int']>;
    status?: Maybe<Enum_Group_Status>;
};

export type GroupRelationResponseCollection = {
    __typename?: 'GroupRelationResponseCollection';
    data: Array<GroupEntity>;
};

export type I18NLocale = {
    __typename?: 'I18NLocale';
    name?: Maybe<Scalars['String']>;
    code?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
    __typename?: 'I18NLocaleEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<I18NLocale>;
};

export type I18NLocaleEntityResponse = {
    __typename?: 'I18NLocaleEntityResponse';
    data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
    __typename?: 'I18NLocaleEntityResponseCollection';
    data: Array<I18NLocaleEntity>;
    meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
    id?: Maybe<IdFilterInput>;
    name?: Maybe<StringFilterInput>;
    code?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<I18NLocaleFiltersInput>>>;
    or?: Maybe<Array<Maybe<I18NLocaleFiltersInput>>>;
    not?: Maybe<I18NLocaleFiltersInput>;
};

export type IdFilterInput = {
    and?: Maybe<Array<Maybe<Scalars['ID']>>>;
    or?: Maybe<Array<Maybe<Scalars['ID']>>>;
    not?: Maybe<IdFilterInput>;
    eq?: Maybe<Scalars['ID']>;
    eqi?: Maybe<Scalars['ID']>;
    ne?: Maybe<Scalars['ID']>;
    startsWith?: Maybe<Scalars['ID']>;
    endsWith?: Maybe<Scalars['ID']>;
    contains?: Maybe<Scalars['ID']>;
    notContains?: Maybe<Scalars['ID']>;
    containsi?: Maybe<Scalars['ID']>;
    notContainsi?: Maybe<Scalars['ID']>;
    gt?: Maybe<Scalars['ID']>;
    gte?: Maybe<Scalars['ID']>;
    lt?: Maybe<Scalars['ID']>;
    lte?: Maybe<Scalars['ID']>;
    null?: Maybe<Scalars['Boolean']>;
    notNull?: Maybe<Scalars['Boolean']>;
    in?: Maybe<Array<Maybe<Scalars['ID']>>>;
    notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
    between?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type IntFilterInput = {
    and?: Maybe<Array<Maybe<Scalars['Int']>>>;
    or?: Maybe<Array<Maybe<Scalars['Int']>>>;
    not?: Maybe<IntFilterInput>;
    eq?: Maybe<Scalars['Int']>;
    eqi?: Maybe<Scalars['Int']>;
    ne?: Maybe<Scalars['Int']>;
    startsWith?: Maybe<Scalars['Int']>;
    endsWith?: Maybe<Scalars['Int']>;
    contains?: Maybe<Scalars['Int']>;
    notContains?: Maybe<Scalars['Int']>;
    containsi?: Maybe<Scalars['Int']>;
    notContainsi?: Maybe<Scalars['Int']>;
    gt?: Maybe<Scalars['Int']>;
    gte?: Maybe<Scalars['Int']>;
    lt?: Maybe<Scalars['Int']>;
    lte?: Maybe<Scalars['Int']>;
    null?: Maybe<Scalars['Boolean']>;
    notNull?: Maybe<Scalars['Boolean']>;
    in?: Maybe<Array<Maybe<Scalars['Int']>>>;
    notIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
    between?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type JsonFilterInput = {
    and?: Maybe<Array<Maybe<Scalars['JSON']>>>;
    or?: Maybe<Array<Maybe<Scalars['JSON']>>>;
    not?: Maybe<JsonFilterInput>;
    eq?: Maybe<Scalars['JSON']>;
    eqi?: Maybe<Scalars['JSON']>;
    ne?: Maybe<Scalars['JSON']>;
    startsWith?: Maybe<Scalars['JSON']>;
    endsWith?: Maybe<Scalars['JSON']>;
    contains?: Maybe<Scalars['JSON']>;
    notContains?: Maybe<Scalars['JSON']>;
    containsi?: Maybe<Scalars['JSON']>;
    notContainsi?: Maybe<Scalars['JSON']>;
    gt?: Maybe<Scalars['JSON']>;
    gte?: Maybe<Scalars['JSON']>;
    lt?: Maybe<Scalars['JSON']>;
    lte?: Maybe<Scalars['JSON']>;
    null?: Maybe<Scalars['Boolean']>;
    notNull?: Maybe<Scalars['Boolean']>;
    in?: Maybe<Array<Maybe<Scalars['JSON']>>>;
    notIn?: Maybe<Array<Maybe<Scalars['JSON']>>>;
    between?: Maybe<Array<Maybe<Scalars['JSON']>>>;
};

export type Message = {
    __typename?: 'Message';
    fullName: Scalars['String'];
    email: Scalars['String'];
    phoneNumber: Scalars['String'];
    message?: Maybe<Scalars['String']>;
    parent?: Maybe<MessageEntityResponse>;
    child?: Maybe<MessageEntityResponse>;
    type: Enum_Message_Type;
    interestedCourses?: Maybe<CourseRelationResponseCollection>;
    isRead?: Maybe<Scalars['Boolean']>;
    interestedConsultings?: Maybe<Scalars['JSON']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MessageInterestedCoursesArgs = {
    filters?: Maybe<CourseFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MessageEntity = {
    __typename?: 'MessageEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Message>;
};

export type MessageEntityResponse = {
    __typename?: 'MessageEntityResponse';
    data?: Maybe<MessageEntity>;
};

export type MessageEntityResponseCollection = {
    __typename?: 'MessageEntityResponseCollection';
    data: Array<MessageEntity>;
    meta: ResponseCollectionMeta;
};

export type MessageFiltersInput = {
    id?: Maybe<IdFilterInput>;
    fullName?: Maybe<StringFilterInput>;
    email?: Maybe<StringFilterInput>;
    phoneNumber?: Maybe<StringFilterInput>;
    message?: Maybe<StringFilterInput>;
    parent?: Maybe<MessageFiltersInput>;
    child?: Maybe<MessageFiltersInput>;
    type?: Maybe<StringFilterInput>;
    interestedCourses?: Maybe<CourseFiltersInput>;
    isRead?: Maybe<BooleanFilterInput>;
    interestedConsultings?: Maybe<JsonFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<MessageFiltersInput>>>;
    or?: Maybe<Array<Maybe<MessageFiltersInput>>>;
    not?: Maybe<MessageFiltersInput>;
};

export type MessageInput = {
    fullName?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    message?: Maybe<Scalars['String']>;
    parent?: Maybe<Scalars['ID']>;
    child?: Maybe<Scalars['ID']>;
    type?: Maybe<Enum_Message_Type>;
    interestedCourses?: Maybe<Array<Maybe<Scalars['ID']>>>;
    isRead?: Maybe<Scalars['Boolean']>;
    interestedConsultings?: Maybe<Scalars['JSON']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    createUploadFile?: Maybe<UploadFileEntityResponse>;
    updateUploadFile?: Maybe<UploadFileEntityResponse>;
    deleteUploadFile?: Maybe<UploadFileEntityResponse>;
    createUploadFolder?: Maybe<UploadFolderEntityResponse>;
    updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
    deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
    createBlog?: Maybe<BlogEntityResponse>;
    updateBlog?: Maybe<BlogEntityResponse>;
    deleteBlog?: Maybe<BlogEntityResponse>;
    createBookmarkedCourse?: Maybe<BookmarkedCourseEntityResponse>;
    updateBookmarkedCourse?: Maybe<BookmarkedCourseEntityResponse>;
    deleteBookmarkedCourse?: Maybe<BookmarkedCourseEntityResponse>;
    createBroadcast?: Maybe<BroadcastEntityResponse>;
    updateBroadcast?: Maybe<BroadcastEntityResponse>;
    deleteBroadcast?: Maybe<BroadcastEntityResponse>;
    createBroadcastSerie?: Maybe<BroadcastSerieEntityResponse>;
    updateBroadcastSerie?: Maybe<BroadcastSerieEntityResponse>;
    deleteBroadcastSerie?: Maybe<BroadcastSerieEntityResponse>;
    createCallback?: Maybe<CallbackEntityResponse>;
    updateCallback?: Maybe<CallbackEntityResponse>;
    deleteCallback?: Maybe<CallbackEntityResponse>;
    createConsulting?: Maybe<ConsultingEntityResponse>;
    updateConsulting?: Maybe<ConsultingEntityResponse>;
    deleteConsulting?: Maybe<ConsultingEntityResponse>;
    createCourse?: Maybe<CourseEntityResponse>;
    updateCourse?: Maybe<CourseEntityResponse>;
    deleteCourse?: Maybe<CourseEntityResponse>;
    createCourseRegister?: Maybe<CourseRegisterEntityResponse>;
    updateCourseRegister?: Maybe<CourseRegisterEntityResponse>;
    deleteCourseRegister?: Maybe<CourseRegisterEntityResponse>;
    createEmployee?: Maybe<EmployeeEntityResponse>;
    updateEmployee?: Maybe<EmployeeEntityResponse>;
    deleteEmployee?: Maybe<EmployeeEntityResponse>;
    createGroup?: Maybe<GroupEntityResponse>;
    updateGroup?: Maybe<GroupEntityResponse>;
    deleteGroup?: Maybe<GroupEntityResponse>;
    createMessage?: Maybe<MessageEntityResponse>;
    updateMessage?: Maybe<MessageEntityResponse>;
    deleteMessage?: Maybe<MessageEntityResponse>;
    createSliderShow?: Maybe<SliderShowEntityResponse>;
    updateSliderShow?: Maybe<SliderShowEntityResponse>;
    deleteSliderShow?: Maybe<SliderShowEntityResponse>;
    createSubscriber?: Maybe<SubscriberEntityResponse>;
    updateSubscriber?: Maybe<SubscriberEntityResponse>;
    deleteSubscriber?: Maybe<SubscriberEntityResponse>;
    createTrainer?: Maybe<TrainerEntityResponse>;
    updateTrainer?: Maybe<TrainerEntityResponse>;
    deleteTrainer?: Maybe<TrainerEntityResponse>;
    createTransaction?: Maybe<TransactionEntityResponse>;
    updateTransaction?: Maybe<TransactionEntityResponse>;
    deleteTransaction?: Maybe<TransactionEntityResponse>;
    createVideo?: Maybe<VideoEntityResponse>;
    updateVideo?: Maybe<VideoEntityResponse>;
    deleteVideo?: Maybe<VideoEntityResponse>;
    upload: UploadFileEntityResponse;
    multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
    updateFileInfo: UploadFileEntityResponse;
    removeFile?: Maybe<UploadFileEntityResponse>;
    createBlogLocalization?: Maybe<BlogEntityResponse>;
    createBroadcastLocalization?: Maybe<BroadcastEntityResponse>;
    createBroadcastSerieLocalization?: Maybe<BroadcastSerieEntityResponse>;
    createTrainerLocalization?: Maybe<TrainerEntityResponse>;
    createVideoLocalization?: Maybe<VideoEntityResponse>;
    /** Create a new role */
    createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
    /** Update an existing role */
    updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
    /** Delete an existing role */
    deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
    /** Create a new user */
    createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    /** Update an existing user */
    updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    /** Delete an existing user */
    deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    login: UsersPermissionsLoginPayload;
    /** Register a user */
    register: UsersPermissionsLoginPayload;
    /** Request a reset password token */
    forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
    /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
    resetPassword?: Maybe<UsersPermissionsLoginPayload>;
    /** Confirm an email users email address */
    emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
};

export type MutationCreateUploadFileArgs = {
    data: UploadFileInput;
};

export type MutationUpdateUploadFileArgs = {
    id: Scalars['ID'];
    data: UploadFileInput;
};

export type MutationDeleteUploadFileArgs = {
    id: Scalars['ID'];
};

export type MutationCreateUploadFolderArgs = {
    data: UploadFolderInput;
};

export type MutationUpdateUploadFolderArgs = {
    id: Scalars['ID'];
    data: UploadFolderInput;
};

export type MutationDeleteUploadFolderArgs = {
    id: Scalars['ID'];
};

export type MutationCreateBlogArgs = {
    data: BlogInput;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateBlogArgs = {
    id: Scalars['ID'];
    data: BlogInput;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteBlogArgs = {
    id: Scalars['ID'];
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateBookmarkedCourseArgs = {
    data: BookmarkedCourseInput;
};

export type MutationUpdateBookmarkedCourseArgs = {
    id: Scalars['ID'];
    data: BookmarkedCourseInput;
};

export type MutationDeleteBookmarkedCourseArgs = {
    id: Scalars['ID'];
};

export type MutationCreateBroadcastArgs = {
    data: BroadcastInput;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateBroadcastArgs = {
    id: Scalars['ID'];
    data: BroadcastInput;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteBroadcastArgs = {
    id: Scalars['ID'];
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateBroadcastSerieArgs = {
    data: BroadcastSerieInput;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateBroadcastSerieArgs = {
    id: Scalars['ID'];
    data: BroadcastSerieInput;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteBroadcastSerieArgs = {
    id: Scalars['ID'];
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateCallbackArgs = {
    data: CallbackInput;
};

export type MutationUpdateCallbackArgs = {
    id: Scalars['ID'];
    data: CallbackInput;
};

export type MutationDeleteCallbackArgs = {
    id: Scalars['ID'];
};

export type MutationCreateConsultingArgs = {
    data: ConsultingInput;
};

export type MutationUpdateConsultingArgs = {
    id: Scalars['ID'];
    data: ConsultingInput;
};

export type MutationDeleteConsultingArgs = {
    id: Scalars['ID'];
};

export type MutationCreateCourseArgs = {
    data: CourseInput;
};

export type MutationUpdateCourseArgs = {
    id: Scalars['ID'];
    data: CourseInput;
};

export type MutationDeleteCourseArgs = {
    id: Scalars['ID'];
};

export type MutationCreateCourseRegisterArgs = {
    data: CourseRegisterInput;
};

export type MutationUpdateCourseRegisterArgs = {
    id: Scalars['ID'];
    data: CourseRegisterInput;
};

export type MutationDeleteCourseRegisterArgs = {
    id: Scalars['ID'];
};

export type MutationCreateEmployeeArgs = {
    data: EmployeeInput;
};

export type MutationUpdateEmployeeArgs = {
    id: Scalars['ID'];
    data: EmployeeInput;
};

export type MutationDeleteEmployeeArgs = {
    id: Scalars['ID'];
};

export type MutationCreateGroupArgs = {
    data: GroupInput;
};

export type MutationUpdateGroupArgs = {
    id: Scalars['ID'];
    data: GroupInput;
};

export type MutationDeleteGroupArgs = {
    id: Scalars['ID'];
};

export type MutationCreateMessageArgs = {
    data: MessageInput;
};

export type MutationUpdateMessageArgs = {
    id: Scalars['ID'];
    data: MessageInput;
};

export type MutationDeleteMessageArgs = {
    id: Scalars['ID'];
};

export type MutationCreateSliderShowArgs = {
    data: SliderShowInput;
};

export type MutationUpdateSliderShowArgs = {
    id: Scalars['ID'];
    data: SliderShowInput;
};

export type MutationDeleteSliderShowArgs = {
    id: Scalars['ID'];
};

export type MutationCreateSubscriberArgs = {
    data: SubscriberInput;
};

export type MutationUpdateSubscriberArgs = {
    id: Scalars['ID'];
    data: SubscriberInput;
};

export type MutationDeleteSubscriberArgs = {
    id: Scalars['ID'];
};

export type MutationCreateTrainerArgs = {
    data: TrainerInput;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateTrainerArgs = {
    id: Scalars['ID'];
    data: TrainerInput;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteTrainerArgs = {
    id: Scalars['ID'];
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateTransactionArgs = {
    data: TransactionInput;
};

export type MutationUpdateTransactionArgs = {
    id: Scalars['ID'];
    data: TransactionInput;
};

export type MutationDeleteTransactionArgs = {
    id: Scalars['ID'];
};

export type MutationCreateVideoArgs = {
    data: VideoInput;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationUpdateVideoArgs = {
    id: Scalars['ID'];
    data: VideoInput;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationDeleteVideoArgs = {
    id: Scalars['ID'];
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationUploadArgs = {
    refId?: Maybe<Scalars['ID']>;
    ref?: Maybe<Scalars['String']>;
    field?: Maybe<Scalars['String']>;
    info?: Maybe<FileInfoInput>;
    file: Scalars['Upload'];
};

export type MutationMultipleUploadArgs = {
    refId?: Maybe<Scalars['ID']>;
    ref?: Maybe<Scalars['String']>;
    field?: Maybe<Scalars['String']>;
    files: Array<Maybe<Scalars['Upload']>>;
};

export type MutationUpdateFileInfoArgs = {
    id: Scalars['ID'];
    info?: Maybe<FileInfoInput>;
};

export type MutationRemoveFileArgs = {
    id: Scalars['ID'];
};

export type MutationCreateBlogLocalizationArgs = {
    id?: Maybe<Scalars['ID']>;
    data?: Maybe<BlogInput>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateBroadcastLocalizationArgs = {
    id?: Maybe<Scalars['ID']>;
    data?: Maybe<BroadcastInput>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateBroadcastSerieLocalizationArgs = {
    id?: Maybe<Scalars['ID']>;
    data?: Maybe<BroadcastSerieInput>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateTrainerLocalizationArgs = {
    id?: Maybe<Scalars['ID']>;
    data?: Maybe<TrainerInput>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateVideoLocalizationArgs = {
    id?: Maybe<Scalars['ID']>;
    data?: Maybe<VideoInput>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type MutationCreateUsersPermissionsRoleArgs = {
    data: UsersPermissionsRoleInput;
};

export type MutationUpdateUsersPermissionsRoleArgs = {
    id: Scalars['ID'];
    data: UsersPermissionsRoleInput;
};

export type MutationDeleteUsersPermissionsRoleArgs = {
    id: Scalars['ID'];
};

export type MutationCreateUsersPermissionsUserArgs = {
    data: UsersPermissionsUserInput;
};

export type MutationUpdateUsersPermissionsUserArgs = {
    id: Scalars['ID'];
    data: UsersPermissionsUserInput;
};

export type MutationDeleteUsersPermissionsUserArgs = {
    id: Scalars['ID'];
};

export type MutationLoginArgs = {
    input: UsersPermissionsLoginInput;
};

export type MutationRegisterArgs = {
    input: UsersPermissionsRegisterInput;
};

export type MutationForgotPasswordArgs = {
    email: Scalars['String'];
};

export type MutationResetPasswordArgs = {
    password: Scalars['String'];
    passwordConfirmation: Scalars['String'];
    code: Scalars['String'];
};

export type MutationEmailConfirmationArgs = {
    confirmation: Scalars['String'];
};

export type Pagination = {
    __typename?: 'Pagination';
    total: Scalars['Int'];
    page: Scalars['Int'];
    pageSize: Scalars['Int'];
    pageCount: Scalars['Int'];
};

export type PaginationArg = {
    page?: Maybe<Scalars['Int']>;
    pageSize?: Maybe<Scalars['Int']>;
    start?: Maybe<Scalars['Int']>;
    limit?: Maybe<Scalars['Int']>;
};

export type Query = {
    __typename?: 'Query';
    uploadFile?: Maybe<UploadFileEntityResponse>;
    uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
    uploadFolder?: Maybe<UploadFolderEntityResponse>;
    uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
    i18NLocale?: Maybe<I18NLocaleEntityResponse>;
    i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
    usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
    usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
    usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
    usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
    blog?: Maybe<BlogEntityResponse>;
    blogs?: Maybe<BlogEntityResponseCollection>;
    bookmarkedCourse?: Maybe<BookmarkedCourseEntityResponse>;
    bookmarkedCourses?: Maybe<BookmarkedCourseEntityResponseCollection>;
    broadcast?: Maybe<BroadcastEntityResponse>;
    broadcasts?: Maybe<BroadcastEntityResponseCollection>;
    broadcastSerie?: Maybe<BroadcastSerieEntityResponse>;
    broadcastSeries?: Maybe<BroadcastSerieEntityResponseCollection>;
    callback?: Maybe<CallbackEntityResponse>;
    callbacks?: Maybe<CallbackEntityResponseCollection>;
    consulting?: Maybe<ConsultingEntityResponse>;
    consultings?: Maybe<ConsultingEntityResponseCollection>;
    course?: Maybe<CourseEntityResponse>;
    courses?: Maybe<CourseEntityResponseCollection>;
    courseRegister?: Maybe<CourseRegisterEntityResponse>;
    courseRegisters?: Maybe<CourseRegisterEntityResponseCollection>;
    employee?: Maybe<EmployeeEntityResponse>;
    employees?: Maybe<EmployeeEntityResponseCollection>;
    group?: Maybe<GroupEntityResponse>;
    groups?: Maybe<GroupEntityResponseCollection>;
    message?: Maybe<MessageEntityResponse>;
    messages?: Maybe<MessageEntityResponseCollection>;
    sliderShow?: Maybe<SliderShowEntityResponse>;
    sliderShows?: Maybe<SliderShowEntityResponseCollection>;
    subscriber?: Maybe<SubscriberEntityResponse>;
    subscribers?: Maybe<SubscriberEntityResponseCollection>;
    trainer?: Maybe<TrainerEntityResponse>;
    trainers?: Maybe<TrainerEntityResponseCollection>;
    transaction?: Maybe<TransactionEntityResponse>;
    transactions?: Maybe<TransactionEntityResponseCollection>;
    video?: Maybe<VideoEntityResponse>;
    videos?: Maybe<VideoEntityResponseCollection>;
    me?: Maybe<UsersPermissionsMe>;
};

export type QueryUploadFileArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryUploadFilesArgs = {
    filters?: Maybe<UploadFileFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryUploadFolderArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryUploadFoldersArgs = {
    filters?: Maybe<UploadFolderFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryI18NLocaleArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryI18NLocalesArgs = {
    filters?: Maybe<I18NLocaleFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryUsersPermissionsRoleArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryUsersPermissionsRolesArgs = {
    filters?: Maybe<UsersPermissionsRoleFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryUsersPermissionsUserArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryUsersPermissionsUsersArgs = {
    filters?: Maybe<UsersPermissionsUserFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryBlogArgs = {
    id?: Maybe<Scalars['ID']>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type QueryBlogsArgs = {
    filters?: Maybe<BlogFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type QueryBookmarkedCourseArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryBookmarkedCoursesArgs = {
    filters?: Maybe<BookmarkedCourseFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryBroadcastArgs = {
    id?: Maybe<Scalars['ID']>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type QueryBroadcastsArgs = {
    filters?: Maybe<BroadcastFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type QueryBroadcastSerieArgs = {
    id?: Maybe<Scalars['ID']>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type QueryBroadcastSeriesArgs = {
    filters?: Maybe<BroadcastSerieFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type QueryCallbackArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryCallbacksArgs = {
    filters?: Maybe<CallbackFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryConsultingArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryConsultingsArgs = {
    filters?: Maybe<ConsultingFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryCourseArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryCoursesArgs = {
    filters?: Maybe<CourseFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryCourseRegisterArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryCourseRegistersArgs = {
    filters?: Maybe<CourseRegisterFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryEmployeeArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryEmployeesArgs = {
    filters?: Maybe<EmployeeFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryGroupArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryGroupsArgs = {
    filters?: Maybe<GroupFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryMessageArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryMessagesArgs = {
    filters?: Maybe<MessageFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QuerySliderShowArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QuerySliderShowsArgs = {
    filters?: Maybe<SliderShowFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QuerySubscriberArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QuerySubscribersArgs = {
    filters?: Maybe<SubscriberFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryTrainerArgs = {
    id?: Maybe<Scalars['ID']>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type QueryTrainersArgs = {
    filters?: Maybe<TrainerFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type QueryTransactionArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryTransactionsArgs = {
    filters?: Maybe<TransactionFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryVideoArgs = {
    id?: Maybe<Scalars['ID']>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type QueryVideosArgs = {
    filters?: Maybe<VideoFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
    locale?: Maybe<Scalars['I18NLocaleCode']>;
};

export type ResponseCollectionMeta = {
    __typename?: 'ResponseCollectionMeta';
    pagination: Pagination;
};

export type SliderShow = {
    __typename?: 'SliderShow';
    title?: Maybe<Scalars['String']>;
    content?: Maybe<Scalars['String']>;
    coverImage: UploadFileEntityResponse;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SliderShowEntity = {
    __typename?: 'SliderShowEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<SliderShow>;
};

export type SliderShowEntityResponse = {
    __typename?: 'SliderShowEntityResponse';
    data?: Maybe<SliderShowEntity>;
};

export type SliderShowEntityResponseCollection = {
    __typename?: 'SliderShowEntityResponseCollection';
    data: Array<SliderShowEntity>;
    meta: ResponseCollectionMeta;
};

export type SliderShowFiltersInput = {
    id?: Maybe<IdFilterInput>;
    title?: Maybe<StringFilterInput>;
    content?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<SliderShowFiltersInput>>>;
    or?: Maybe<Array<Maybe<SliderShowFiltersInput>>>;
    not?: Maybe<SliderShowFiltersInput>;
};

export type SliderShowInput = {
    title?: Maybe<Scalars['String']>;
    content?: Maybe<Scalars['String']>;
    coverImage?: Maybe<Scalars['ID']>;
};

export type StringFilterInput = {
    and?: Maybe<Array<Maybe<Scalars['String']>>>;
    or?: Maybe<Array<Maybe<Scalars['String']>>>;
    not?: Maybe<StringFilterInput>;
    eq?: Maybe<Scalars['String']>;
    eqi?: Maybe<Scalars['String']>;
    ne?: Maybe<Scalars['String']>;
    startsWith?: Maybe<Scalars['String']>;
    endsWith?: Maybe<Scalars['String']>;
    contains?: Maybe<Scalars['String']>;
    notContains?: Maybe<Scalars['String']>;
    containsi?: Maybe<Scalars['String']>;
    notContainsi?: Maybe<Scalars['String']>;
    gt?: Maybe<Scalars['String']>;
    gte?: Maybe<Scalars['String']>;
    lt?: Maybe<Scalars['String']>;
    lte?: Maybe<Scalars['String']>;
    null?: Maybe<Scalars['Boolean']>;
    notNull?: Maybe<Scalars['Boolean']>;
    in?: Maybe<Array<Maybe<Scalars['String']>>>;
    notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
    between?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Subscriber = {
    __typename?: 'Subscriber';
    email: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SubscriberEntity = {
    __typename?: 'SubscriberEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Subscriber>;
};

export type SubscriberEntityResponse = {
    __typename?: 'SubscriberEntityResponse';
    data?: Maybe<SubscriberEntity>;
};

export type SubscriberEntityResponseCollection = {
    __typename?: 'SubscriberEntityResponseCollection';
    data: Array<SubscriberEntity>;
    meta: ResponseCollectionMeta;
};

export type SubscriberFiltersInput = {
    id?: Maybe<IdFilterInput>;
    email?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<SubscriberFiltersInput>>>;
    or?: Maybe<Array<Maybe<SubscriberFiltersInput>>>;
    not?: Maybe<SubscriberFiltersInput>;
};

export type SubscriberInput = {
    email?: Maybe<Scalars['String']>;
};

export type Trainer = {
    __typename?: 'Trainer';
    trainerTitle?: Maybe<Scalars['String']>;
    courses?: Maybe<CourseRelationResponseCollection>;
    fullName?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    status?: Maybe<Enum_Trainer_Status>;
    image?: Maybe<UploadFileEntityResponse>;
    gender?: Maybe<Enum_Trainer_Gender>;
    profileImage?: Maybe<UploadFileEntityResponse>;
    logoImage?: Maybe<UploadFileEntityResponse>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    link?: Maybe<Scalars['String']>;
    company?: Maybe<Scalars['String']>;
    position?: Maybe<Scalars['String']>;
    body?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    surName?: Maybe<Scalars['String']>;
    birthdayDate?: Maybe<Scalars['Date']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    localizations?: Maybe<TrainerRelationResponseCollection>;
    locale?: Maybe<Scalars['String']>;
};

export type TrainerCoursesArgs = {
    filters?: Maybe<CourseFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type TrainerLocalizationsArgs = {
    filters?: Maybe<TrainerFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type TrainerEntity = {
    __typename?: 'TrainerEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Trainer>;
};

export type TrainerEntityResponse = {
    __typename?: 'TrainerEntityResponse';
    data?: Maybe<TrainerEntity>;
};

export type TrainerEntityResponseCollection = {
    __typename?: 'TrainerEntityResponseCollection';
    data: Array<TrainerEntity>;
    meta: ResponseCollectionMeta;
};

export type TrainerFiltersInput = {
    id?: Maybe<IdFilterInput>;
    trainerTitle?: Maybe<StringFilterInput>;
    courses?: Maybe<CourseFiltersInput>;
    fullName?: Maybe<StringFilterInput>;
    email?: Maybe<StringFilterInput>;
    phoneNumber?: Maybe<StringFilterInput>;
    status?: Maybe<StringFilterInput>;
    gender?: Maybe<StringFilterInput>;
    firstName?: Maybe<StringFilterInput>;
    lastName?: Maybe<StringFilterInput>;
    link?: Maybe<StringFilterInput>;
    company?: Maybe<StringFilterInput>;
    position?: Maybe<StringFilterInput>;
    body?: Maybe<StringFilterInput>;
    name?: Maybe<StringFilterInput>;
    surName?: Maybe<StringFilterInput>;
    birthdayDate?: Maybe<DateFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    localizations?: Maybe<TrainerFiltersInput>;
    locale?: Maybe<StringFilterInput>;
    and?: Maybe<Array<Maybe<TrainerFiltersInput>>>;
    or?: Maybe<Array<Maybe<TrainerFiltersInput>>>;
    not?: Maybe<TrainerFiltersInput>;
};

export type TrainerInput = {
    trainerTitle?: Maybe<Scalars['String']>;
    courses?: Maybe<Array<Maybe<Scalars['ID']>>>;
    fullName?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    status?: Maybe<Enum_Trainer_Status>;
    image?: Maybe<Scalars['ID']>;
    gender?: Maybe<Enum_Trainer_Gender>;
    profileImage?: Maybe<Scalars['ID']>;
    logoImage?: Maybe<Scalars['ID']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    link?: Maybe<Scalars['String']>;
    company?: Maybe<Scalars['String']>;
    position?: Maybe<Scalars['String']>;
    body?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    surName?: Maybe<Scalars['String']>;
    birthdayDate?: Maybe<Scalars['Date']>;
};

export type TrainerRelationResponseCollection = {
    __typename?: 'TrainerRelationResponseCollection';
    data: Array<TrainerEntity>;
};

export type Transaction = {
    __typename?: 'Transaction';
    currency: Enum_Transaction_Currency;
    status: Enum_Transaction_Status;
    amount: Scalars['Float'];
    group?: Maybe<GroupEntityResponse>;
    user?: Maybe<UsersPermissionsUserEntityResponse>;
    orderId: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TransactionEntity = {
    __typename?: 'TransactionEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Transaction>;
};

export type TransactionEntityResponse = {
    __typename?: 'TransactionEntityResponse';
    data?: Maybe<TransactionEntity>;
};

export type TransactionEntityResponseCollection = {
    __typename?: 'TransactionEntityResponseCollection';
    data: Array<TransactionEntity>;
    meta: ResponseCollectionMeta;
};

export type TransactionFiltersInput = {
    id?: Maybe<IdFilterInput>;
    currency?: Maybe<StringFilterInput>;
    status?: Maybe<StringFilterInput>;
    amount?: Maybe<FloatFilterInput>;
    group?: Maybe<GroupFiltersInput>;
    user?: Maybe<UsersPermissionsUserFiltersInput>;
    orderId?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<TransactionFiltersInput>>>;
    or?: Maybe<Array<Maybe<TransactionFiltersInput>>>;
    not?: Maybe<TransactionFiltersInput>;
};

export type TransactionInput = {
    currency?: Maybe<Enum_Transaction_Currency>;
    status?: Maybe<Enum_Transaction_Status>;
    amount?: Maybe<Scalars['Float']>;
    group?: Maybe<Scalars['ID']>;
    user?: Maybe<Scalars['ID']>;
    orderId?: Maybe<Scalars['String']>;
};

export type TransactionRelationResponseCollection = {
    __typename?: 'TransactionRelationResponseCollection';
    data: Array<TransactionEntity>;
};

export type UploadFile = {
    __typename?: 'UploadFile';
    name: Scalars['String'];
    alternativeText?: Maybe<Scalars['String']>;
    caption?: Maybe<Scalars['String']>;
    width?: Maybe<Scalars['Int']>;
    height?: Maybe<Scalars['Int']>;
    formats?: Maybe<Scalars['JSON']>;
    hash: Scalars['String'];
    ext?: Maybe<Scalars['String']>;
    mime: Scalars['String'];
    size: Scalars['Float'];
    url: Scalars['String'];
    previewUrl?: Maybe<Scalars['String']>;
    provider: Scalars['String'];
    provider_metadata?: Maybe<Scalars['JSON']>;
    related?: Maybe<Array<Maybe<GenericMorph>>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UploadFileEntity = {
    __typename?: 'UploadFileEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<UploadFile>;
};

export type UploadFileEntityResponse = {
    __typename?: 'UploadFileEntityResponse';
    data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
    __typename?: 'UploadFileEntityResponseCollection';
    data: Array<UploadFileEntity>;
    meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
    id?: Maybe<IdFilterInput>;
    name?: Maybe<StringFilterInput>;
    alternativeText?: Maybe<StringFilterInput>;
    caption?: Maybe<StringFilterInput>;
    width?: Maybe<IntFilterInput>;
    height?: Maybe<IntFilterInput>;
    formats?: Maybe<JsonFilterInput>;
    hash?: Maybe<StringFilterInput>;
    ext?: Maybe<StringFilterInput>;
    mime?: Maybe<StringFilterInput>;
    size?: Maybe<FloatFilterInput>;
    url?: Maybe<StringFilterInput>;
    previewUrl?: Maybe<StringFilterInput>;
    provider?: Maybe<StringFilterInput>;
    provider_metadata?: Maybe<JsonFilterInput>;
    folder?: Maybe<UploadFolderFiltersInput>;
    folderPath?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<UploadFileFiltersInput>>>;
    or?: Maybe<Array<Maybe<UploadFileFiltersInput>>>;
    not?: Maybe<UploadFileFiltersInput>;
};

export type UploadFileInput = {
    name?: Maybe<Scalars['String']>;
    alternativeText?: Maybe<Scalars['String']>;
    caption?: Maybe<Scalars['String']>;
    width?: Maybe<Scalars['Int']>;
    height?: Maybe<Scalars['Int']>;
    formats?: Maybe<Scalars['JSON']>;
    hash?: Maybe<Scalars['String']>;
    ext?: Maybe<Scalars['String']>;
    mime?: Maybe<Scalars['String']>;
    size?: Maybe<Scalars['Float']>;
    url?: Maybe<Scalars['String']>;
    previewUrl?: Maybe<Scalars['String']>;
    provider?: Maybe<Scalars['String']>;
    provider_metadata?: Maybe<Scalars['JSON']>;
    folder?: Maybe<Scalars['ID']>;
    folderPath?: Maybe<Scalars['String']>;
};

export type UploadFileRelationResponseCollection = {
    __typename?: 'UploadFileRelationResponseCollection';
    data: Array<UploadFileEntity>;
};

export type UploadFolder = {
    __typename?: 'UploadFolder';
    name: Scalars['String'];
    pathId: Scalars['Int'];
    parent?: Maybe<UploadFolderEntityResponse>;
    children?: Maybe<UploadFolderRelationResponseCollection>;
    files?: Maybe<UploadFileRelationResponseCollection>;
    path: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UploadFolderChildrenArgs = {
    filters?: Maybe<UploadFolderFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UploadFolderFilesArgs = {
    filters?: Maybe<UploadFileFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
    __typename?: 'UploadFolderEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<UploadFolder>;
};

export type UploadFolderEntityResponse = {
    __typename?: 'UploadFolderEntityResponse';
    data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
    __typename?: 'UploadFolderEntityResponseCollection';
    data: Array<UploadFolderEntity>;
    meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
    id?: Maybe<IdFilterInput>;
    name?: Maybe<StringFilterInput>;
    pathId?: Maybe<IntFilterInput>;
    parent?: Maybe<UploadFolderFiltersInput>;
    children?: Maybe<UploadFolderFiltersInput>;
    files?: Maybe<UploadFileFiltersInput>;
    path?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<UploadFolderFiltersInput>>>;
    or?: Maybe<Array<Maybe<UploadFolderFiltersInput>>>;
    not?: Maybe<UploadFolderFiltersInput>;
};

export type UploadFolderInput = {
    name?: Maybe<Scalars['String']>;
    pathId?: Maybe<Scalars['Int']>;
    parent?: Maybe<Scalars['ID']>;
    children?: Maybe<Array<Maybe<Scalars['ID']>>>;
    files?: Maybe<Array<Maybe<Scalars['ID']>>>;
    path?: Maybe<Scalars['String']>;
};

export type UploadFolderRelationResponseCollection = {
    __typename?: 'UploadFolderRelationResponseCollection';
    data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
    __typename?: 'UsersPermissionsCreateRolePayload';
    ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
    __typename?: 'UsersPermissionsDeleteRolePayload';
    ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
    identifier: Scalars['String'];
    password: Scalars['String'];
    provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
    __typename?: 'UsersPermissionsLoginPayload';
    jwt?: Maybe<Scalars['String']>;
    user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
    __typename?: 'UsersPermissionsMe';
    id: Scalars['ID'];
    username: Scalars['String'];
    email?: Maybe<Scalars['String']>;
    confirmed?: Maybe<Scalars['Boolean']>;
    blocked?: Maybe<Scalars['Boolean']>;
    role?: Maybe<UsersPermissionsMeRole>;
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    trainerTitle?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    dateOfBirth?: Maybe<Scalars['Date']>;
    gender?: Maybe<Gender>;
    bio?: Maybe<Scalars['String']>;
    address?: Maybe<Scalars['String']>;
    facebookLink?: Maybe<Scalars['String']>;
    linkedinLink?: Maybe<Scalars['String']>;
    userPicture?: Maybe<Scalars['Upload']>;
    companyLogo?: Maybe<Scalars['Upload']>;
    hasJob?: Maybe<Scalars['Boolean']>;
    companyName?: Maybe<Scalars['String']>;
    jobTitle?: Maybe<Scalars['String']>;
    schoolName?: Maybe<Scalars['String']>;
    studyField?: Maybe<Scalars['String']>;
};

export type UsersPermissionsMeRole = {
    __typename?: 'UsersPermissionsMeRole';
    id: Scalars['ID'];
    name: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
    __typename?: 'UsersPermissionsPasswordPayload';
    ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
    __typename?: 'UsersPermissionsPermission';
    action: Scalars['String'];
    role?: Maybe<UsersPermissionsRoleEntityResponse>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
    __typename?: 'UsersPermissionsPermissionEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<UsersPermissionsPermission>;
};

export type UsersPermissionsPermissionFiltersInput = {
    id?: Maybe<IdFilterInput>;
    action?: Maybe<StringFilterInput>;
    role?: Maybe<UsersPermissionsRoleFiltersInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<UsersPermissionsPermissionFiltersInput>>>;
    or?: Maybe<Array<Maybe<UsersPermissionsPermissionFiltersInput>>>;
    not?: Maybe<UsersPermissionsPermissionFiltersInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
    __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
    data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
    username: Scalars['String'];
    email: Scalars['String'];
    password: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    trainerTitle?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    dateOfBirth?: Maybe<Scalars['Date']>;
    gender?: Maybe<Gender>;
    bio?: Maybe<Scalars['String']>;
    address?: Maybe<Scalars['String']>;
    facebookLink?: Maybe<Scalars['String']>;
    linkedinLink?: Maybe<Scalars['String']>;
    userPicture?: Maybe<Scalars['Upload']>;
    companyLogo?: Maybe<Scalars['Upload']>;
    hasJob?: Maybe<Scalars['Boolean']>;
    companyName?: Maybe<Scalars['String']>;
    jobTitle?: Maybe<Scalars['String']>;
    schoolName?: Maybe<Scalars['String']>;
    studyField?: Maybe<Scalars['String']>;
    confirmed?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsRole = {
    __typename?: 'UsersPermissionsRole';
    name: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
    permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
    users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsRolePermissionsArgs = {
    filters?: Maybe<UsersPermissionsPermissionFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleUsersArgs = {
    filters?: Maybe<UsersPermissionsUserFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
    __typename?: 'UsersPermissionsRoleEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsRoleEntityResponse = {
    __typename?: 'UsersPermissionsRoleEntityResponse';
    data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
    __typename?: 'UsersPermissionsRoleEntityResponseCollection';
    data: Array<UsersPermissionsRoleEntity>;
    meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
    id?: Maybe<IdFilterInput>;
    name?: Maybe<StringFilterInput>;
    description?: Maybe<StringFilterInput>;
    type?: Maybe<StringFilterInput>;
    permissions?: Maybe<UsersPermissionsPermissionFiltersInput>;
    users?: Maybe<UsersPermissionsUserFiltersInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<UsersPermissionsRoleFiltersInput>>>;
    or?: Maybe<Array<Maybe<UsersPermissionsRoleFiltersInput>>>;
    not?: Maybe<UsersPermissionsRoleFiltersInput>;
};

export type UsersPermissionsRoleInput = {
    name?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
    permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
    users?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
    __typename?: 'UsersPermissionsUpdateRolePayload';
    ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
    __typename?: 'UsersPermissionsUser';
    username: Scalars['String'];
    email: Scalars['String'];
    provider?: Maybe<Scalars['String']>;
    confirmed?: Maybe<Scalars['Boolean']>;
    blocked?: Maybe<Scalars['Boolean']>;
    role?: Maybe<UsersPermissionsRoleEntityResponse>;
    blogs?: Maybe<BlogRelationResponseCollection>;
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    trainerTitle?: Maybe<Scalars['String']>;
    phoneNumber: Scalars['String'];
    dateOfBirth: Scalars['Date'];
    gender: Gender;
    bio?: Maybe<Scalars['String']>;
    address?: Maybe<Scalars['String']>;
    facebookLink?: Maybe<Scalars['String']>;
    linkedinLink?: Maybe<Scalars['String']>;
    userPicture?: Maybe<UploadFileEntityResponse>;
    companyLogo?: Maybe<UploadFileEntityResponse>;
    hasJob?: Maybe<Scalars['Boolean']>;
    companyName?: Maybe<Scalars['String']>;
    jobTitle?: Maybe<Scalars['String']>;
    schoolName?: Maybe<Scalars['String']>;
    studyField?: Maybe<Scalars['String']>;
    favoriteCourse?: Maybe<CourseRelationResponseCollection>;
    transactions?: Maybe<TransactionRelationResponseCollection>;
    course_registers?: Maybe<CourseRegisterRelationResponseCollection>;
    bookmarked_courses?: Maybe<BookmarkedCourseRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserBlogsArgs = {
    filters?: Maybe<BlogFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UsersPermissionsUserFavoriteCourseArgs = {
    filters?: Maybe<CourseFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UsersPermissionsUserTransactionsArgs = {
    filters?: Maybe<TransactionFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UsersPermissionsUserCourse_RegistersArgs = {
    filters?: Maybe<CourseRegisterFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UsersPermissionsUserBookmarked_CoursesArgs = {
    filters?: Maybe<BookmarkedCourseFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UsersPermissionsUserEntity = {
    __typename?: 'UsersPermissionsUserEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<UsersPermissionsUser>;
};

export type UsersPermissionsUserEntityResponse = {
    __typename?: 'UsersPermissionsUserEntityResponse';
    data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
    __typename?: 'UsersPermissionsUserEntityResponseCollection';
    data: Array<UsersPermissionsUserEntity>;
    meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
    id?: Maybe<IdFilterInput>;
    username?: Maybe<StringFilterInput>;
    email?: Maybe<StringFilterInput>;
    provider?: Maybe<StringFilterInput>;
    password?: Maybe<StringFilterInput>;
    resetPasswordToken?: Maybe<StringFilterInput>;
    confirmationToken?: Maybe<StringFilterInput>;
    confirmed?: Maybe<BooleanFilterInput>;
    blocked?: Maybe<BooleanFilterInput>;
    role?: Maybe<UsersPermissionsRoleFiltersInput>;
    blogs?: Maybe<BlogFiltersInput>;
    firstName?: Maybe<StringFilterInput>;
    lastName?: Maybe<StringFilterInput>;
    trainerTitle?: Maybe<StringFilterInput>;
    phoneNumber?: Maybe<StringFilterInput>;
    dateOfBirth?: Maybe<DateFilterInput>;
    gender?: Maybe<StringFilterInput>;
    bio?: Maybe<StringFilterInput>;
    address?: Maybe<StringFilterInput>;
    facebookLink?: Maybe<StringFilterInput>;
    linkedinLink?: Maybe<StringFilterInput>;
    hasJob?: Maybe<BooleanFilterInput>;
    companyName?: Maybe<StringFilterInput>;
    jobTitle?: Maybe<StringFilterInput>;
    schoolName?: Maybe<StringFilterInput>;
    studyField?: Maybe<StringFilterInput>;
    favoriteCourse?: Maybe<CourseFiltersInput>;
    transactions?: Maybe<TransactionFiltersInput>;
    course_registers?: Maybe<CourseRegisterFiltersInput>;
    bookmarked_courses?: Maybe<BookmarkedCourseFiltersInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    and?: Maybe<Array<Maybe<UsersPermissionsUserFiltersInput>>>;
    or?: Maybe<Array<Maybe<UsersPermissionsUserFiltersInput>>>;
    not?: Maybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsUserInput = {
    username?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    provider?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
    resetPasswordToken?: Maybe<Scalars['String']>;
    confirmationToken?: Maybe<Scalars['String']>;
    confirmed?: Maybe<Scalars['Boolean']>;
    blocked?: Maybe<Scalars['Boolean']>;
    role?: Maybe<Scalars['ID']>;
    blogs?: Maybe<Array<Maybe<Scalars['ID']>>>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    trainerTitle?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    dateOfBirth?: Maybe<Scalars['Date']>;
    gender?: Maybe<Gender>;
    bio?: Maybe<Scalars['String']>;
    address?: Maybe<Scalars['String']>;
    facebookLink?: Maybe<Scalars['String']>;
    linkedinLink?: Maybe<Scalars['String']>;
    userPicture?: Maybe<Scalars['ID']>;
    companyLogo?: Maybe<Scalars['ID']>;
    hasJob?: Maybe<Scalars['Boolean']>;
    companyName?: Maybe<Scalars['String']>;
    jobTitle?: Maybe<Scalars['String']>;
    schoolName?: Maybe<Scalars['String']>;
    studyField?: Maybe<Scalars['String']>;
    favoriteCourse?: Maybe<Array<Maybe<Scalars['ID']>>>;
    transactions?: Maybe<Array<Maybe<Scalars['ID']>>>;
    course_registers?: Maybe<Array<Maybe<Scalars['ID']>>>;
    bookmarked_courses?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UsersPermissionsUserRelationResponseCollection = {
    __typename?: 'UsersPermissionsUserRelationResponseCollection';
    data: Array<UsersPermissionsUserEntity>;
};

export type Video = {
    __typename?: 'Video';
    title: Scalars['String'];
    body: Scalars['String'];
    viewCount?: Maybe<Scalars['Int']>;
    coverImage: UploadFileEntityResponse;
    category?: Maybe<Scalars['JSON']>;
    slug?: Maybe<Scalars['String']>;
    videoId: Scalars['String'];
    status?: Maybe<Enum_Video_Status>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    localizations?: Maybe<VideoRelationResponseCollection>;
    locale?: Maybe<Scalars['String']>;
};

export type VideoLocalizationsArgs = {
    filters?: Maybe<VideoFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type VideoEntity = {
    __typename?: 'VideoEntity';
    id?: Maybe<Scalars['ID']>;
    attributes?: Maybe<Video>;
};

export type VideoEntityResponse = {
    __typename?: 'VideoEntityResponse';
    data?: Maybe<VideoEntity>;
};

export type VideoEntityResponseCollection = {
    __typename?: 'VideoEntityResponseCollection';
    data: Array<VideoEntity>;
    meta: ResponseCollectionMeta;
};

export type VideoFiltersInput = {
    id?: Maybe<IdFilterInput>;
    title?: Maybe<StringFilterInput>;
    body?: Maybe<StringFilterInput>;
    viewCount?: Maybe<IntFilterInput>;
    category?: Maybe<JsonFilterInput>;
    slug?: Maybe<StringFilterInput>;
    videoId?: Maybe<StringFilterInput>;
    status?: Maybe<StringFilterInput>;
    createdAt?: Maybe<DateTimeFilterInput>;
    updatedAt?: Maybe<DateTimeFilterInput>;
    localizations?: Maybe<VideoFiltersInput>;
    locale?: Maybe<StringFilterInput>;
    and?: Maybe<Array<Maybe<VideoFiltersInput>>>;
    or?: Maybe<Array<Maybe<VideoFiltersInput>>>;
    not?: Maybe<VideoFiltersInput>;
};

export type VideoInput = {
    title?: Maybe<Scalars['String']>;
    body?: Maybe<Scalars['String']>;
    viewCount?: Maybe<Scalars['Int']>;
    coverImage?: Maybe<Scalars['ID']>;
    category?: Maybe<Scalars['JSON']>;
    slug?: Maybe<Scalars['String']>;
    videoId?: Maybe<Scalars['String']>;
    status?: Maybe<Enum_Video_Status>;
};

export type VideoRelationResponseCollection = {
    __typename?: 'VideoRelationResponseCollection';
    data: Array<VideoEntity>;
};

export type CreateBookmarkedCourseMutationVariables = Exact<{
    data: BookmarkedCourseInput;
}>;

export type CreateBookmarkedCourseMutation = { __typename?: 'Mutation' } & {
    createBookmarkedCourse?: Maybe<
        { __typename?: 'BookmarkedCourseEntityResponse' } & {
            data?: Maybe<{ __typename?: 'BookmarkedCourseEntity' } & Pick<BookmarkedCourseEntity, 'id'>>;
        }
    >;
};

export type CreateCallbackMutationVariables = Exact<{
    data: CallbackInput;
}>;

export type CreateCallbackMutation = { __typename?: 'Mutation' } & {
    createCallback?: Maybe<
        { __typename?: 'CallbackEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'CallbackEntity' } & Pick<CallbackEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Callback' } & Pick<Callback, 'phoneNumber'>>;
                }
            >;
        }
    >;
};

export type CreateMessageMutationVariables = Exact<{
    data: MessageInput;
}>;

export type CreateMessageMutation = { __typename?: 'Mutation' } & {
    createMessage?: Maybe<
        { __typename?: 'MessageEntityResponse' } & {
            data?: Maybe<{ __typename?: 'MessageEntity' } & Pick<MessageEntity, 'id'>>;
        }
    >;
};

export type CreateSubscriberMutationVariables = Exact<{
    data: SubscriberInput;
}>;

export type CreateSubscriberMutation = { __typename?: 'Mutation' } & {
    createSubscriber?: Maybe<
        { __typename?: 'SubscriberEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'SubscriberEntity' } & Pick<SubscriberEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Subscriber' } & Pick<Subscriber, 'email' | 'createdAt'>>;
                }
            >;
        }
    >;
};

export type DeleteBookmarkedCourseMutationVariables = Exact<{
    deleteBookmarkedCourseId: Scalars['ID'];
}>;

export type DeleteBookmarkedCourseMutation = { __typename?: 'Mutation' } & {
    deleteBookmarkedCourse?: Maybe<
        { __typename?: 'BookmarkedCourseEntityResponse' } & {
            data?: Maybe<{ __typename?: 'BookmarkedCourseEntity' } & Pick<BookmarkedCourseEntity, 'id'>>;
        }
    >;
};

export type EmailConfirmationMutationVariables = Exact<{
    confirmation: Scalars['String'];
}>;

export type EmailConfirmationMutation = { __typename?: 'Mutation' } & {
    emailConfirmation?: Maybe<
        { __typename?: 'UsersPermissionsLoginPayload' } & Pick<UsersPermissionsLoginPayload, 'jwt'>
    >;
};

export type ForgotPasswordMutationVariables = Exact<{
    email: Scalars['String'];
}>;

export type ForgotPasswordMutation = { __typename?: 'Mutation' } & {
    forgotPassword?: Maybe<
        { __typename?: 'UsersPermissionsPasswordPayload' } & Pick<UsersPermissionsPasswordPayload, 'ok'>
    >;
};

export type LoginMutationVariables = Exact<{
    input: UsersPermissionsLoginInput;
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
    login: { __typename?: 'UsersPermissionsLoginPayload' } & Pick<UsersPermissionsLoginPayload, 'jwt'> & {
        user: { __typename?: 'UsersPermissionsMe' } & Pick<
            UsersPermissionsMe,
            'id' | 'username' | 'email' | 'confirmed' | 'blocked' | 'firstName' | 'lastName'
        >;
    };
};

export type CreateBlogMutationVariables = Exact<{
    data: BlogInput;
}>;

export type CreateBlogMutation = { __typename?: 'Mutation' } & {
    createBlog?: Maybe<
        { __typename?: 'BlogEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BlogEntity' } & Pick<BlogEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Blog' } & Pick<Blog, 'title'>>;
                }
            >;
        }
    >;
};

export type CreateBroadcastSerieMutationVariables = Exact<{
    data: BroadcastSerieInput;
}>;

export type CreateBroadcastSerieMutation = { __typename?: 'Mutation' } & {
    createBroadcastSerie?: Maybe<
        { __typename?: 'BroadcastSerieEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BroadcastSerieEntity' } & Pick<BroadcastSerieEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'BroadcastSerie' } & Pick<BroadcastSerie, 'title' | 'slug'>>;
                }
            >;
        }
    >;
};

export type CreateBroadcastMutationVariables = Exact<{
    data: BroadcastInput;
}>;

export type CreateBroadcastMutation = { __typename?: 'Mutation' } & {
    createBroadcast?: Maybe<
        { __typename?: 'BroadcastEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BroadcastEntity' } & Pick<BroadcastEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Broadcast' } & Pick<Broadcast, 'title'>>;
                }
            >;
        }
    >;
};

export type CreateCourseRegisterMutationVariables = Exact<{
    data: CourseRegisterInput;
}>;

export type CreateCourseRegisterMutation = { __typename?: 'Mutation' } & {
    createCourseRegister?: Maybe<
        { __typename?: 'CourseRegisterEntityResponse' } & {
            data?: Maybe<{ __typename?: 'CourseRegisterEntity' } & Pick<CourseRegisterEntity, 'id'>>;
        }
    >;
};

export type CreateCourseMutationVariables = Exact<{
    data: CourseInput;
}>;

export type CreateCourseMutation = { __typename?: 'Mutation' } & {
    createCourse?: Maybe<
        { __typename?: 'CourseEntityResponse' } & {
            data?: Maybe<{ __typename?: 'CourseEntity' } & Pick<CourseEntity, 'id'>>;
        }
    >;
};

export type CreateEmployeeMutationVariables = Exact<{
    data: EmployeeInput;
}>;

export type CreateEmployeeMutation = { __typename?: 'Mutation' } & {
    createEmployee?: Maybe<
        { __typename?: 'EmployeeEntityResponse' } & {
            data?: Maybe<{ __typename?: 'EmployeeEntity' } & Pick<EmployeeEntity, 'id'>>;
        }
    >;
};

export type CreateGroupMutationVariables = Exact<{
    data: GroupInput;
}>;

export type CreateGroupMutation = { __typename?: 'Mutation' } & {
    createGroup?: Maybe<
        { __typename?: 'GroupEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'GroupEntity' } & Pick<GroupEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Group' } & Pick<Group, 'name'>>;
                }
            >;
        }
    >;
};

export type CreateSliderShowMutationVariables = Exact<{
    data: SliderShowInput;
}>;

export type CreateSliderShowMutation = { __typename?: 'Mutation' } & {
    createSliderShow?: Maybe<
        { __typename?: 'SliderShowEntityResponse' } & {
            data?: Maybe<{ __typename?: 'SliderShowEntity' } & Pick<SliderShowEntity, 'id'>>;
        }
    >;
};

export type CreateTrainerMutationVariables = Exact<{
    data: TrainerInput;
}>;

export type CreateTrainerMutation = { __typename?: 'Mutation' } & {
    createTrainer?: Maybe<
        { __typename?: 'TrainerEntityResponse' } & {
            data?: Maybe<{ __typename?: 'TrainerEntity' } & Pick<TrainerEntity, 'id'>>;
        }
    >;
};

export type CreateVideoMutationVariables = Exact<{
    data: VideoInput;
}>;

export type CreateVideoMutation = { __typename?: 'Mutation' } & {
    createVideo?: Maybe<
        { __typename?: 'VideoEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'VideoEntity' } & Pick<VideoEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Video' } & Pick<Video, 'title'>>;
                }
            >;
        }
    >;
};

export type DeleteBlogMutationVariables = Exact<{
    deleteBlogId: Scalars['ID'];
}>;

export type DeleteBlogMutation = { __typename?: 'Mutation' } & {
    deleteBlog?: Maybe<
        { __typename?: 'BlogEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BlogEntity' } & Pick<BlogEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Blog' } & Pick<Blog, 'body'>>;
                }
            >;
        }
    >;
};

export type DeleteBroadcastSerieMutationVariables = Exact<{
    deleteBroadcastSerieId: Scalars['ID'];
}>;

export type DeleteBroadcastSerieMutation = { __typename?: 'Mutation' } & {
    deleteBroadcastSerie?: Maybe<
        { __typename?: 'BroadcastSerieEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BroadcastSerieEntity' } & Pick<BroadcastSerieEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'BroadcastSerie' } & Pick<BroadcastSerie, 'title'>>;
                }
            >;
        }
    >;
};

export type DeleteBroadcastMutationVariables = Exact<{
    deleteBroadcastId: Scalars['ID'];
}>;

export type DeleteBroadcastMutation = { __typename?: 'Mutation' } & {
    deleteBroadcast?: Maybe<
        { __typename?: 'BroadcastEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BroadcastEntity' } & Pick<BroadcastEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Broadcast' } & Pick<Broadcast, 'title'>>;
                }
            >;
        }
    >;
};

export type DeleteCallbackMutationVariables = Exact<{
    deleteCallbackId: Scalars['ID'];
}>;

export type DeleteCallbackMutation = { __typename?: 'Mutation' } & {
    deleteCallback?: Maybe<
        { __typename?: 'CallbackEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'CallbackEntity' } & Pick<CallbackEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Callback' } & Pick<Callback, 'phoneNumber'>>;
                }
            >;
        }
    >;
};

export type DeleteCourseRegisterMutationVariables = Exact<{
    deleteCourseRegisterId: Scalars['ID'];
}>;

export type DeleteCourseRegisterMutation = { __typename?: 'Mutation' } & {
    deleteCourseRegister?: Maybe<
        { __typename?: 'CourseRegisterEntityResponse' } & {
            data?: Maybe<{ __typename?: 'CourseRegisterEntity' } & Pick<CourseRegisterEntity, 'id'>>;
        }
    >;
};

export type DeleteEmployeeMutationVariables = Exact<{
    deleteEmployeeId: Scalars['ID'];
}>;

export type DeleteEmployeeMutation = { __typename?: 'Mutation' } & {
    deleteEmployee?: Maybe<
        { __typename?: 'EmployeeEntityResponse' } & {
            data?: Maybe<{ __typename?: 'EmployeeEntity' } & Pick<EmployeeEntity, 'id'>>;
        }
    >;
};

export type DeleteMessageMutationVariables = Exact<{
    deleteMessageId: Scalars['ID'];
}>;

export type DeleteMessageMutation = { __typename?: 'Mutation' } & {
    deleteMessage?: Maybe<
        { __typename?: 'MessageEntityResponse' } & {
            data?: Maybe<{ __typename?: 'MessageEntity' } & Pick<MessageEntity, 'id'>>;
        }
    >;
};

export type DeleteUsersPermissionsUserMutationVariables = Exact<{
    deleteUsersPermissionsUserId: Scalars['ID'];
}>;

export type DeleteUsersPermissionsUserMutation = { __typename?: 'Mutation' } & {
    deleteUsersPermissionsUser: { __typename?: 'UsersPermissionsUserEntityResponse' } & {
        data?: Maybe<{ __typename?: 'UsersPermissionsUserEntity' } & Pick<UsersPermissionsUserEntity, 'id'>>;
    };
};

export type DeleteSliderShowMutationVariables = Exact<{
    deleteSliderShowId: Scalars['ID'];
}>;

export type DeleteSliderShowMutation = { __typename?: 'Mutation' } & {
    deleteSliderShow?: Maybe<
        { __typename?: 'SliderShowEntityResponse' } & {
            data?: Maybe<{ __typename?: 'SliderShowEntity' } & Pick<SliderShowEntity, 'id'>>;
        }
    >;
};

export type DeleteSubscriberMutationVariables = Exact<{
    deleteSubscriberId: Scalars['ID'];
}>;

export type DeleteSubscriberMutation = { __typename?: 'Mutation' } & {
    deleteSubscriber?: Maybe<
        { __typename?: 'SubscriberEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'SubscriberEntity' } & Pick<SubscriberEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Subscriber' } & Pick<Subscriber, 'email'>>;
                }
            >;
        }
    >;
};

export type DeleteTrainerMutationVariables = Exact<{
    deleteTrainerId: Scalars['ID'];
}>;

export type DeleteTrainerMutation = { __typename?: 'Mutation' } & {
    deleteTrainer?: Maybe<
        { __typename?: 'TrainerEntityResponse' } & {
            data?: Maybe<{ __typename?: 'TrainerEntity' } & Pick<TrainerEntity, 'id'>>;
        }
    >;
};

export type DeleteVideoMutationVariables = Exact<{
    deleteVideoId: Scalars['ID'];
}>;

export type DeleteVideoMutation = { __typename?: 'Mutation' } & {
    deleteVideo?: Maybe<
        { __typename?: 'VideoEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'VideoEntity' } & Pick<VideoEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Video' } & Pick<Video, 'title'>>;
                }
            >;
        }
    >;
};

export type DeleteGroupMutationVariables = Exact<{
    deleteGroupId: Scalars['ID'];
}>;

export type DeleteGroupMutation = { __typename?: 'Mutation' } & {
    deleteGroup?: Maybe<
        { __typename?: 'GroupEntityResponse' } & {
            data?: Maybe<{ __typename?: 'GroupEntity' } & Pick<GroupEntity, 'id'>>;
        }
    >;
};

export type UpdateBlogMutationVariables = Exact<{
    updateBlogId: Scalars['ID'];
    data: BlogInput;
}>;

export type UpdateBlogMutation = { __typename?: 'Mutation' } & {
    updateBlog?: Maybe<
        { __typename?: 'BlogEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BlogEntity' } & Pick<BlogEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Blog' } & Pick<Blog, 'title'>>;
                }
            >;
        }
    >;
};

export type UpdateBroadcastMutationVariables = Exact<{
    updateBroadcastId: Scalars['ID'];
    data: BroadcastInput;
}>;

export type UpdateBroadcastMutation = { __typename?: 'Mutation' } & {
    updateBroadcast?: Maybe<
        { __typename?: 'BroadcastEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BroadcastEntity' } & Pick<BroadcastEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Broadcast' } & Pick<Broadcast, 'title'>>;
                }
            >;
        }
    >;
};

export type UpdateBroadcastSerieMutationVariables = Exact<{
    updateBroadcastSerieId: Scalars['ID'];
    data: BroadcastSerieInput;
}>;

export type UpdateBroadcastSerieMutation = { __typename?: 'Mutation' } & {
    updateBroadcastSerie?: Maybe<
        { __typename?: 'BroadcastSerieEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BroadcastSerieEntity' } & Pick<BroadcastSerieEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'BroadcastSerie' } & Pick<BroadcastSerie, 'title'>>;
                }
            >;
        }
    >;
};

export type UpdateCallbackMutationVariables = Exact<{
    updateCallbackId: Scalars['ID'];
    data: CallbackInput;
}>;

export type UpdateCallbackMutation = { __typename?: 'Mutation' } & {
    updateCallback?: Maybe<
        { __typename?: 'CallbackEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'CallbackEntity' } & Pick<CallbackEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Callback' } & Pick<Callback, 'phoneNumber' | 'isCalled'>>;
                }
            >;
        }
    >;
};

export type UpdateCourseRegisterMutationVariables = Exact<{
    updateCourseRegisterId: Scalars['ID'];
    data: CourseRegisterInput;
}>;

export type UpdateCourseRegisterMutation = { __typename?: 'Mutation' } & {
    updateCourseRegister?: Maybe<
        { __typename?: 'CourseRegisterEntityResponse' } & {
            data?: Maybe<{ __typename?: 'CourseRegisterEntity' } & Pick<CourseRegisterEntity, 'id'>>;
        }
    >;
};

export type UpdateCourseMutationVariables = Exact<{
    updateCourseId: Scalars['ID'];
    data: CourseInput;
}>;

export type UpdateCourseMutation = { __typename?: 'Mutation' } & {
    updateCourse?: Maybe<
        { __typename?: 'CourseEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'CourseEntity' } & Pick<CourseEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Course' } & Pick<Course, 'name'>>;
                }
            >;
        }
    >;
};

export type UpdateEmployeeMutationVariables = Exact<{
    updateEmployeeId: Scalars['ID'];
    data: EmployeeInput;
}>;

export type UpdateEmployeeMutation = { __typename?: 'Mutation' } & {
    updateEmployee?: Maybe<
        { __typename?: 'EmployeeEntityResponse' } & {
            data?: Maybe<{ __typename?: 'EmployeeEntity' } & Pick<EmployeeEntity, 'id'>>;
        }
    >;
};

export type UpdateGroupMutationVariables = Exact<{
    updateGroupId: Scalars['ID'];
    data: GroupInput;
}>;

export type UpdateGroupMutation = { __typename?: 'Mutation' } & {
    updateGroup?: Maybe<
        { __typename?: 'GroupEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'GroupEntity' } & Pick<GroupEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Group' } & Pick<Group, 'name'>>;
                }
            >;
        }
    >;
};

export type UpdateMessageMutationVariables = Exact<{
    updateMessageId: Scalars['ID'];
    data: MessageInput;
}>;

export type UpdateMessageMutation = { __typename?: 'Mutation' } & {
    updateMessage?: Maybe<
        { __typename?: 'MessageEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'MessageEntity' } & Pick<MessageEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Message' } & Pick<Message, 'isRead' | 'message' | 'fullName'>
                    >;
                }
            >;
        }
    >;
};

export type UpdateUsersPermissionsUserMutationVariables = Exact<{
    updateUsersPermissionsUserId: Scalars['ID'];
    data: UsersPermissionsUserInput;
}>;

export type UpdateUsersPermissionsUserMutation = { __typename?: 'Mutation' } & {
    updateUsersPermissionsUser: { __typename?: 'UsersPermissionsUserEntityResponse' } & {
        data?: Maybe<
            { __typename?: 'UsersPermissionsUserEntity' } & Pick<UsersPermissionsUserEntity, 'id'> & {
                attributes?: Maybe<
                    { __typename?: 'UsersPermissionsUser' } & Pick<UsersPermissionsUser, 'firstName'>
                >;
            }
        >;
    };
};

export type UpdateSliderShowMutationVariables = Exact<{
    updateSliderShowId: Scalars['ID'];
    data: SliderShowInput;
}>;

export type UpdateSliderShowMutation = { __typename?: 'Mutation' } & {
    updateSliderShow?: Maybe<
        { __typename?: 'SliderShowEntityResponse' } & {
            data?: Maybe<{ __typename?: 'SliderShowEntity' } & Pick<SliderShowEntity, 'id'>>;
        }
    >;
};

export type UpdateTrainerMutationVariables = Exact<{
    updateTrainerId: Scalars['ID'];
    data: TrainerInput;
}>;

export type UpdateTrainerMutation = { __typename?: 'Mutation' } & {
    updateTrainer?: Maybe<
        { __typename?: 'TrainerEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'TrainerEntity' } & Pick<TrainerEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Trainer' } & Pick<Trainer, 'trainerTitle' | 'fullName'>>;
                }
            >;
        }
    >;
};

export type UpdateVideoMutationVariables = Exact<{
    updateVideoId: Scalars['ID'];
    data: VideoInput;
}>;

export type UpdateVideoMutation = { __typename?: 'Mutation' } & {
    updateVideo?: Maybe<
        { __typename?: 'VideoEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'VideoEntity' } & Pick<VideoEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Video' } & Pick<Video, 'title'>>;
                }
            >;
        }
    >;
};

export type RegisterMutationVariables = Exact<{
    input: UsersPermissionsRegisterInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
    register: { __typename?: 'UsersPermissionsLoginPayload' } & Pick<UsersPermissionsLoginPayload, 'jwt'> & {
        user: { __typename?: 'UsersPermissionsMe' } & Pick<UsersPermissionsMe, 'id' | 'username'>;
    };
};

export type ResetPasswordMutationVariables = Exact<{
    password: Scalars['String'];
    passwordConfirmation: Scalars['String'];
    code: Scalars['String'];
}>;

export type ResetPasswordMutation = { __typename?: 'Mutation' } & {
    resetPassword?: Maybe<{ __typename?: 'UsersPermissionsLoginPayload' } & Pick<UsersPermissionsLoginPayload, 'jwt'>>;
};

export type BlogQueryVariables = Exact<{
    filters?: Maybe<BlogFiltersInput>;
}>;

export type BlogQuery = { __typename?: 'Query' } & {
    blogs?: Maybe<
        { __typename?: 'BlogEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'BlogEntity' } & Pick<BlogEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Blog' } & Pick<
                            Blog,
                            'title' | 'body' | 'category' | 'createdAt' | 'status'
                        > & {
                            coverImage?: Maybe<
                                { __typename?: 'UploadFileEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'UploadFile' } & Pick<
                                                    UploadFile,
                                                    'name' | 'url'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type BlogsQueryVariables = Exact<{
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
    filters?: Maybe<BlogFiltersInput>;
}>;

export type BlogsQuery = { __typename?: 'Query' } & {
    blogs?: Maybe<
        { __typename?: 'BlogEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'BlogEntity' } & Pick<BlogEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Blog' } & Pick<
                            Blog,
                            'title' | 'slug' | 'category' | 'createdAt' | 'body' | 'status'
                        > & {
                            coverImage?: Maybe<
                                { __typename?: 'UploadFileEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'UploadFile' } & Pick<
                                                    UploadFile,
                                                    'url' | 'name'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'total' | 'page' | 'pageSize' | 'pageCount'
                >;
            };
        }
    >;
};

export type BroadcastSeriesQueryVariables = Exact<{
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
    broadcastSeriesPagination2?: Maybe<PaginationArg>;
    filters?: Maybe<BroadcastSerieFiltersInput>;
}>;

export type BroadcastSeriesQuery = { __typename?: 'Query' } & {
    broadcastSeries?: Maybe<
        { __typename?: 'BroadcastSerieEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'BroadcastSerieEntity' } & Pick<BroadcastSerieEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'BroadcastSerie' } & Pick<
                            BroadcastSerie,
                            'title' | 'slug' | 'totalMinutes' | 'status' | 'createdAt'
                        > & {
                            broadcasts?: Maybe<
                                { __typename?: 'BroadcastRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'BroadcastEntity' } & Pick<BroadcastEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Broadcast' } & Pick<
                                                    Broadcast,
                                                    'title' | 'category' | 'slug' | 'createdAt' | 'status'
                                                > & {
                                                    coverImage: {
                                                        __typename?: 'UploadFileEntityResponse';
                                                    } & {
                                                        data?: Maybe<
                                                            { __typename?: 'UploadFileEntity' } & {
                                                                attributes?: Maybe<
                                                                    {
                                                                        __typename?: 'UploadFile';
                                                                    } & Pick<UploadFile, 'url'>
                                                                >;
                                                            }
                                                        >;
                                                    };
                                                }
                                            >;
                                        }
                                    >;
                                }
                            >;
                            coverImage: { __typename?: 'UploadFileEntityResponse' } & {
                                data?: Maybe<
                                    { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                        attributes?: Maybe<
                                            { __typename?: 'UploadFile' } & Pick<UploadFile, 'url'>
                                        >;
                                    }
                                >;
                            };
                        }
                    >;
                }
            >;
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'pageCount' | 'page' | 'pageSize' | 'total'
                >;
            };
        }
    >;
};

export type BroadcastQueryVariables = Exact<{
    filters?: Maybe<BroadcastFiltersInput>;
}>;

export type BroadcastQuery = { __typename?: 'Query' } & {
    broadcasts?: Maybe<
        { __typename?: 'BroadcastEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'BroadcastEntity' } & Pick<BroadcastEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Broadcast' } & Pick<
                            Broadcast,
                            'title' | 'category' | 'slug' | 'videoId' | 'createdAt'
                        > & {
                            coverImage: { __typename?: 'UploadFileEntityResponse' } & {
                                data?: Maybe<
                                    { __typename?: 'UploadFileEntity' } & {
                                        attributes?: Maybe<
                                            { __typename?: 'UploadFile' } & Pick<UploadFile, 'url'>
                                        >;
                                    }
                                >;
                            };
                            broadcast_sery?: Maybe<
                                { __typename?: 'BroadcastSerieEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'BroadcastSerieEntity' } & {
                                            attributes?: Maybe<
                                                { __typename?: 'BroadcastSerie' } & Pick<BroadcastSerie, 'slug'>
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type BroadcastsQueryVariables = Exact<{
    filters?: Maybe<BroadcastFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;

export type BroadcastsQuery = { __typename?: 'Query' } & {
    broadcasts?: Maybe<
        { __typename?: 'BroadcastEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'BroadcastEntity' } & Pick<BroadcastEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Broadcast' } & Pick<
                            Broadcast,
                            'title' | 'category' | 'createdAt' | 'slug' | 'status'
                        > & {
                            coverImage: { __typename?: 'UploadFileEntityResponse' } & {
                                data?: Maybe<
                                    { __typename?: 'UploadFileEntity' } & {
                                        attributes?: Maybe<
                                            { __typename?: 'UploadFile' } & Pick<UploadFile, 'url' | 'name'>
                                        >;
                                    }
                                >;
                            };
                            broadcast_sery?: Maybe<
                                { __typename?: 'BroadcastSerieEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'BroadcastSerieEntity' } & Pick<
                                            BroadcastSerieEntity,
                                            'id'
                                        > & {
                                            attributes?: Maybe<
                                                { __typename?: 'BroadcastSerie' } & Pick<
                                                    BroadcastSerie,
                                                    'slug' | 'title'
                                                > & {
                                                    coverImage: {
                                                        __typename?: 'UploadFileEntityResponse';
                                                    } & {
                                                        data?: Maybe<
                                                            { __typename?: 'UploadFileEntity' } & Pick<
                                                                UploadFileEntity,
                                                                'id'
                                                            > & {
                                                                attributes?: Maybe<
                                                                    {
                                                                        __typename?: 'UploadFile';
                                                                    } & Pick<
                                                                        UploadFile,
                                                                        'name' | 'url'
                                                                    >
                                                                >;
                                                            }
                                                        >;
                                                    };
                                                }
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'page' | 'pageCount' | 'pageSize' | 'total'
                >;
            };
        }
    >;
};

export type CourseDetailQueryVariables = Exact<{
    courseId?: Maybe<Scalars['ID']>;
}>;

export type CourseDetailQuery = { __typename?: 'Query' } & {
    course?: Maybe<
        { __typename?: 'CourseEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'CourseEntity' } & Pick<CourseEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Course' } & Pick<
                            Course,
                            | 'isActive'
                            | 'name'
                            | 'price'
                            | 'category'
                            | 'capacity'
                            | 'description'
                            | 'availableProficiencies'
                            | 'benefits'
                            | 'syllabus'
                            | 'duration'
                            | 'durationType'
                            | 'count'
                            | 'includedPayment'
                            | 'videoId'
                        > & {
                            groups?: Maybe<
                                { __typename?: 'GroupRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'GroupEntity' } & Pick<GroupEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Group' } & Pick<Group, 'name' | 'isActive'>
                                            >;
                                        }
                                    >;
                                }
                            >;
                            trainers?: Maybe<
                                { __typename?: 'TrainerRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'TrainerEntity' } & {
                                            attributes?: Maybe<
                                                { __typename?: 'Trainer' } & Pick<
                                                    Trainer,
                                                    'trainerTitle' | 'fullName' | 'firstName' | 'lastName'
                                                > & {
                                                    image?: Maybe<
                                                        { __typename?: 'UploadFileEntityResponse' } & {
                                                            data?: Maybe<
                                                                { __typename?: 'UploadFileEntity' } & Pick<
                                                                    UploadFileEntity,
                                                                    'id'
                                                                > & {
                                                                    attributes?: Maybe<
                                                                        {
                                                                            __typename?: 'UploadFile';
                                                                        } & Pick<
                                                                            UploadFile,
                                                                            'name' | 'url'
                                                                        >
                                                                    >;
                                                                }
                                                            >;
                                                        }
                                                    >;
                                                    profileImage?: Maybe<
                                                        { __typename?: 'UploadFileEntityResponse' } & {
                                                            data?: Maybe<
                                                                { __typename?: 'UploadFileEntity' } & Pick<
                                                                    UploadFileEntity,
                                                                    'id'
                                                                > & {
                                                                    attributes?: Maybe<
                                                                        {
                                                                            __typename?: 'UploadFile';
                                                                        } & Pick<
                                                                            UploadFile,
                                                                            'name' | 'url'
                                                                        >
                                                                    >;
                                                                }
                                                            >;
                                                        }
                                                    >;
                                                }
                                            >;
                                        }
                                    >;
                                }
                            >;
                            courseImage?: Maybe<
                                { __typename?: 'UploadFileEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'UploadFile' } & Pick<
                                                    UploadFile,
                                                    'name' | 'url'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type CourseQueryVariables = Exact<{
    courseId?: Maybe<Scalars['ID']>;
}>;

export type CourseQuery = { __typename?: 'Query' } & {
    course?: Maybe<
        { __typename?: 'CourseEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'CourseEntity' } & Pick<CourseEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Course' } & Pick<
                            Course,
                            | 'availableProficiencies'
                            | 'videoId'
                            | 'benefits'
                            | 'includedPayment'
                            | 'capacity'
                            | 'category'
                            | 'count'
                            | 'description'
                            | 'durationType'
                            | 'isActive'
                            | 'name'
                            | 'price'
                            | 'status'
                            | 'syllabus'
                            | 'duration'
                        > & {
                            courseImage?: Maybe<
                                { __typename?: 'UploadFileEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'UploadFile' } & Pick<
                                                    UploadFile,
                                                    'size' | 'name' | 'url'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                            groups?: Maybe<
                                { __typename?: 'GroupRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'GroupEntity' } & Pick<GroupEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Group' } & Pick<Group, 'name'>
                                            >;
                                        }
                                    >;
                                }
                            >;
                            trainers?: Maybe<
                                { __typename?: 'TrainerRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'TrainerEntity' } & Pick<TrainerEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Trainer' } & Pick<
                                                    Trainer,
                                                    'firstName' | 'lastName'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type BlogByAdminQueryVariables = Exact<{
    blogId?: Maybe<Scalars['ID']>;
}>;

export type BlogByAdminQuery = { __typename?: 'Query' } & {
    blog?: Maybe<
        { __typename?: 'BlogEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BlogEntity' } & Pick<BlogEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Blog' } & Pick<
                            Blog,
                            'body' | 'category' | 'createdAt' | 'slug' | 'status' | 'title' | 'updatedAt'
                        > & {
                            coverImage?: Maybe<
                                { __typename?: 'UploadFileEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'UploadFile' } & Pick<
                                                    UploadFile,
                                                    'name' | 'url'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type BroadcastByAdminQueryVariables = Exact<{
    broadcastId?: Maybe<Scalars['ID']>;
}>;

export type BroadcastByAdminQuery = { __typename?: 'Query' } & {
    broadcast?: Maybe<
        { __typename?: 'BroadcastEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BroadcastEntity' } & Pick<BroadcastEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Broadcast' } & Pick<
                            Broadcast,
                            'title' | 'status' | 'slug' | 'createdAt' | 'videoId'
                        > & {
                            coverImage: { __typename?: 'UploadFileEntityResponse' } & {
                                data?: Maybe<
                                    { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                        attributes?: Maybe<
                                            { __typename?: 'UploadFile' } & Pick<UploadFile, 'name' | 'url'>
                                        >;
                                    }
                                >;
                            };
                            broadcast_sery?: Maybe<
                                { __typename?: 'BroadcastSerieEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'BroadcastSerieEntity' } & Pick<
                                            BroadcastSerieEntity,
                                            'id'
                                        > & {
                                            attributes?: Maybe<
                                                { __typename?: 'BroadcastSerie' } & Pick<
                                                    BroadcastSerie,
                                                    'title'
                                                > & {
                                                    coverImage: {
                                                        __typename?: 'UploadFileEntityResponse';
                                                    } & {
                                                        data?: Maybe<
                                                            { __typename?: 'UploadFileEntity' } & Pick<
                                                                UploadFileEntity,
                                                                'id'
                                                            > & {
                                                                attributes?: Maybe<
                                                                    {
                                                                        __typename?: 'UploadFile';
                                                                    } & Pick<
                                                                        UploadFile,
                                                                        'url' | 'name'
                                                                    >
                                                                >;
                                                            }
                                                        >;
                                                    };
                                                }
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type BroadcastSerieByAdminQueryVariables = Exact<{
    broadcastSerieId?: Maybe<Scalars['ID']>;
}>;

export type BroadcastSerieByAdminQuery = { __typename?: 'Query' } & {
    broadcastSerie?: Maybe<
        { __typename?: 'BroadcastSerieEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'BroadcastSerieEntity' } & Pick<BroadcastSerieEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'BroadcastSerie' } & Pick<
                            BroadcastSerie,
                            'title' | 'status' | 'slug' | 'createdAt'
                        > & {
                            coverImage: { __typename?: 'UploadFileEntityResponse' } & {
                                data?: Maybe<
                                    { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                        attributes?: Maybe<
                                            { __typename?: 'UploadFile' } & Pick<UploadFile, 'name' | 'url'>
                                        >;
                                    }
                                >;
                            };
                        }
                    >;
                }
            >;
        }
    >;
};

export type CallbacksQueryVariables = Exact<{
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
    pagination?: Maybe<PaginationArg>;
    filters?: Maybe<CallbackFiltersInput>;
}>;

export type CallbacksQuery = { __typename?: 'Query' } & {
    callbacks?: Maybe<
        { __typename?: 'CallbackEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'CallbackEntity' } & Pick<CallbackEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Callback' } & Pick<Callback, 'phoneNumber' | 'createdAt' | 'isCalled'>
                    >;
                }
            >;
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'total' | 'pageSize' | 'pageCount' | 'page'
                >;
            };
        }
    >;
};

export type CourseRegisterQueryVariables = Exact<{
    courseRegisterId?: Maybe<Scalars['ID']>;
}>;

export type CourseRegisterQuery = { __typename?: 'Query' } & {
    courseRegister?: Maybe<
        { __typename?: 'CourseRegisterEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'CourseRegisterEntity' } & Pick<CourseRegisterEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'CourseRegister' } & Pick<CourseRegister, 'paymentStatus' | 'status'> & {
                            user?: Maybe<
                                { __typename?: 'UsersPermissionsUserEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UsersPermissionsUserEntity' } & Pick<
                                            UsersPermissionsUserEntity,
                                            'id'
                                        > & {
                                            attributes?: Maybe<
                                                { __typename?: 'UsersPermissionsUser' } & Pick<
                                                    UsersPermissionsUser,
                                                    'firstName' | 'lastName'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                            group?: Maybe<
                                { __typename?: 'GroupEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'GroupEntity' } & Pick<GroupEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Group' } & Pick<
                                                    Group,
                                                    'name' | 'startsAt' | 'endsAt'
                                                > & {
                                                    course?: Maybe<
                                                        { __typename?: 'CourseEntityResponse' } & {
                                                            data?: Maybe<
                                                                { __typename?: 'CourseEntity' } & {
                                                                    attributes?: Maybe<
                                                                        {
                                                                            __typename?: 'Course';
                                                                        } & Pick<Course, 'name'>
                                                                    >;
                                                                }
                                                            >;
                                                        }
                                                    >;
                                                }
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type CourseRegistersQueryVariables = Exact<{
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
    pagination?: Maybe<PaginationArg>;
    filters?: Maybe<CourseRegisterFiltersInput>;
}>;

export type CourseRegistersQuery = { __typename?: 'Query' } & {
    courseRegisters?: Maybe<
        { __typename?: 'CourseRegisterEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'CourseRegisterEntity' } & Pick<CourseRegisterEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'CourseRegister' } & Pick<CourseRegister, 'paymentStatus' | 'status'> & {
                            user?: Maybe<
                                { __typename?: 'UsersPermissionsUserEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UsersPermissionsUserEntity' } & {
                                            attributes?: Maybe<
                                                { __typename?: 'UsersPermissionsUser' } & Pick<
                                                    UsersPermissionsUser,
                                                    'firstName' | 'lastName'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                            group?: Maybe<
                                { __typename?: 'GroupEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'GroupEntity' } & {
                                            attributes?: Maybe<
                                                { __typename?: 'Group' } & Pick<
                                                    Group,
                                                    'name' | 'startsAt' | 'endsAt'
                                                > & {
                                                    course?: Maybe<
                                                        { __typename?: 'CourseEntityResponse' } & {
                                                            data?: Maybe<
                                                                { __typename?: 'CourseEntity' } & {
                                                                    attributes?: Maybe<
                                                                        { __typename?: 'Course' } & Pick<
                                                                            Course,
                                                                            | 'name'
                                                                            | 'price'
                                                                            | 'duration'
                                                                            | 'durationType'
                                                                            | 'capacity'
                                                                            | 'count'
                                                                        > & {
                                                                            trainers?: Maybe<
                                                                                {
                                                                                    __typename?: 'TrainerRelationResponseCollection';
                                                                                } & {
                                                                                    data: Array<
                                                                                        {
                                                                                            __typename?: 'TrainerEntity';
                                                                                        } & Pick<
                                                                                            TrainerEntity,
                                                                                            'id'
                                                                                        > & {
                                                                                            attributes?: Maybe<
                                                                                                {
                                                                                                    __typename?: 'Trainer';
                                                                                                } & Pick<
                                                                                                    Trainer,
                                                                                                    | 'fullName'
                                                                                                    | 'position'
                                                                                                > & {
                                                                                                    profileImage?: Maybe<
                                                                                                        {
                                                                                                            __typename?: 'UploadFileEntityResponse';
                                                                                                        } & {
                                                                                                            data?: Maybe<
                                                                                                                {
                                                                                                                    __typename?: 'UploadFileEntity';
                                                                                                                } & {
                                                                                                                    attributes?: Maybe<
                                                                                                                        {
                                                                                                                            __typename?: 'UploadFile';
                                                                                                                        } & Pick<
                                                                                                                            UploadFile,
                                                                                                                            | 'url'
                                                                                                                            | 'name'
                                                                                                                        >
                                                                                                                    >;
                                                                                                                }
                                                                                                            >;
                                                                                                        }
                                                                                                    >;
                                                                                                }
                                                                                            >;
                                                                                        }
                                                                                    >;
                                                                                }
                                                                            >;
                                                                        }
                                                                    >;
                                                                }
                                                            >;
                                                        }
                                                    >;
                                                }
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'total' | 'pageSize' | 'pageCount' | 'page'
                >;
            };
        }
    >;
};

export type CoursesQueryVariables = Exact<{
    filters?: Maybe<CourseFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;

export type CoursesQuery = { __typename?: 'Query' } & {
    courses?: Maybe<
        { __typename?: 'CourseEntityResponseCollection' } & {
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'total' | 'page' | 'pageSize' | 'pageCount'
                >;
            };
            data: Array<
                { __typename?: 'CourseEntity' } & Pick<CourseEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Course' } & Pick<
                            Course,
                            | 'isActive'
                            | 'name'
                            | 'category'
                            | 'price'
                            | 'capacity'
                            | 'description'
                            | 'availableProficiencies'
                            | 'benefits'
                            | 'syllabus'
                            | 'durationType'
                            | 'count'
                            | 'duration'
                            | 'status'
                            | 'createdAt'
                            | 'updatedAt'
                        > & {
                            groups?: Maybe<
                                { __typename?: 'GroupRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'GroupEntity' } & Pick<GroupEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Group' } & Pick<Group, 'name'>
                                            >;
                                        }
                                    >;
                                }
                            >;
                            trainers?: Maybe<
                                { __typename?: 'TrainerRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'TrainerEntity' } & Pick<TrainerEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Trainer' } & Pick<
                                                    Trainer,
                                                    'firstName' | 'lastName'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type DeleteCourseMutationVariables = Exact<{
    deleteCourseId: Scalars['ID'];
}>;

export type DeleteCourseMutation = { __typename?: 'Mutation' } & {
    deleteCourse?: Maybe<
        { __typename?: 'CourseEntityResponse' } & {
            data?: Maybe<{ __typename?: 'CourseEntity' } & Pick<CourseEntity, 'id'>>;
        }
    >;
};

export type EmployeeQueryVariables = Exact<{
    employeeId?: Maybe<Scalars['ID']>;
}>;

export type EmployeeQuery = { __typename?: 'Query' } & {
    employee?: Maybe<
        { __typename?: 'EmployeeEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'EmployeeEntity' } & Pick<EmployeeEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Employee' } & Pick<
                            Employee,
                            'firstName' | 'rank' | 'lastName' | 'position' | 'status'
                        > & {
                            image?: Maybe<
                                { __typename?: 'UploadFileEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'UploadFile' } & Pick<
                                                    UploadFile,
                                                    'name' | 'url'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type EmployeesQueryVariables = Exact<{
    filters?: Maybe<EmployeeFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;

export type EmployeesQuery = { __typename?: 'Query' } & {
    employees?: Maybe<
        { __typename?: 'EmployeeEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'EmployeeEntity' } & Pick<EmployeeEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Employee' } & Pick<
                            Employee,
                            'firstName' | 'lastName' | 'position' | 'rank' | 'status' | 'updatedAt'
                        > & {
                            image?: Maybe<
                                { __typename?: 'UploadFileEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'UploadFile' } & Pick<UploadFile, 'url'>
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'page' | 'pageCount' | 'pageSize' | 'total'
                >;
            };
        }
    >;
};

export type GroupQueryVariables = Exact<{
    groupId?: Maybe<Scalars['ID']>;
}>;

export type GroupQuery = { __typename?: 'Query' } & {
    group?: Maybe<
        { __typename?: 'GroupEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'GroupEntity' } & Pick<GroupEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Group' } & Pick<
                            Group,
                            'name' | 'startsAt' | 'endsAt' | 'capacity' | 'status'
                        > & {
                            course?: Maybe<
                                { __typename?: 'CourseEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'CourseEntity' } & Pick<CourseEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Course' } & Pick<Course, 'name'>
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type GroupsQueryVariables = Exact<{
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
    pagination?: Maybe<PaginationArg>;
    filters?: Maybe<GroupFiltersInput>;
}>;

export type GroupsQuery = { __typename?: 'Query' } & {
    groups?: Maybe<
        { __typename?: 'GroupEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'GroupEntity' } & Pick<GroupEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Group' } & Pick<
                            Group,
                            'name' | 'startsAt' | 'endsAt' | 'isActive' | 'capacity' | 'status'
                        > & {
                            course?: Maybe<
                                { __typename?: 'CourseEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'CourseEntity' } & Pick<CourseEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Course' } & Pick<
                                                    Course,
                                                    'price' | 'status' | 'name'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                            course_registers?: Maybe<
                                { __typename?: 'CourseRegisterRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'CourseRegisterEntity' } & Pick<
                                            CourseRegisterEntity,
                                            'id'
                                        >
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'page' | 'pageCount' | 'pageSize' | 'total'
                >;
            };
        }
    >;
};

export type MessagesQueryVariables = Exact<{
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
    pagination?: Maybe<PaginationArg>;
    filters?: Maybe<MessageFiltersInput>;
}>;

export type MessagesQuery = { __typename?: 'Query' } & {
    messages?: Maybe<
        { __typename?: 'MessageEntityResponseCollection' } & {
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'total' | 'pageSize' | 'pageCount' | 'page'
                >;
            };
            data: Array<
                { __typename?: 'MessageEntity' } & Pick<MessageEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Message' } & Pick<
                            Message,
                            | 'fullName'
                            | 'email'
                            | 'createdAt'
                            | 'phoneNumber'
                            | 'message'
                            | 'type'
                            | 'isRead'
                            | 'interestedConsultings'
                        > & {
                            interestedCourses?: Maybe<
                                { __typename?: 'CourseRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'CourseEntity' } & Pick<CourseEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Course' } & Pick<Course, 'name'>
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type SliderShowQueryVariables = Exact<{
    sliderShowId?: Maybe<Scalars['ID']>;
}>;

export type SliderShowQuery = { __typename?: 'Query' } & {
    sliderShow?: Maybe<
        { __typename?: 'SliderShowEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'SliderShowEntity' } & Pick<SliderShowEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'SliderShow' } & Pick<SliderShow, 'content' | 'title'> & {
                            coverImage: { __typename?: 'UploadFileEntityResponse' } & {
                                data?: Maybe<
                                    { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                        attributes?: Maybe<
                                            { __typename?: 'UploadFile' } & Pick<UploadFile, 'url' | 'name'>
                                        >;
                                    }
                                >;
                            };
                        }
                    >;
                }
            >;
        }
    >;
};

export type SliderShowsQueryVariables = Exact<{
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;

export type SliderShowsQuery = { __typename?: 'Query' } & {
    sliderShows?: Maybe<
        { __typename?: 'SliderShowEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'SliderShowEntity' } & Pick<SliderShowEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'SliderShow' } & Pick<SliderShow, 'title' | 'content'> & {
                            coverImage: { __typename?: 'UploadFileEntityResponse' } & {
                                data?: Maybe<
                                    { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                        attributes?: Maybe<
                                            { __typename?: 'UploadFile' } & Pick<UploadFile, 'name' | 'url'>
                                        >;
                                    }
                                >;
                            };
                        }
                    >;
                }
            >;
        }
    >;
};

export type SubscribersQueryVariables = Exact<{
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
    pagination?: Maybe<PaginationArg>;
    filters?: Maybe<SubscriberFiltersInput>;
}>;

export type SubscribersQuery = { __typename?: 'Query' } & {
    subscribers?: Maybe<
        { __typename?: 'SubscriberEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'SubscriberEntity' } & Pick<SubscriberEntity, 'id'> & {
                    attributes?: Maybe<{ __typename?: 'Subscriber' } & Pick<Subscriber, 'email' | 'createdAt'>>;
                }
            >;
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'total' | 'pageSize' | 'page' | 'pageCount'
                >;
            };
        }
    >;
};

export type TrainerQueryVariables = Exact<{
    trainerId?: Maybe<Scalars['ID']>;
    filters?: Maybe<CourseFiltersInput>;
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
    pagination?: Maybe<PaginationArg>;
}>;

export type TrainerQuery = { __typename?: 'Query' } & {
    trainer?: Maybe<
        { __typename?: 'TrainerEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'TrainerEntity' } & Pick<TrainerEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Trainer' } & Pick<
                            Trainer,
                            | 'trainerTitle'
                            | 'fullName'
                            | 'email'
                            | 'phoneNumber'
                            | 'status'
                            | 'gender'
                            | 'firstName'
                            | 'lastName'
                            | 'link'
                            | 'company'
                            | 'position'
                            | 'body'
                            | 'name'
                            | 'surName'
                            | 'birthdayDate'
                            | 'updatedAt'
                        > & {
                            courses?: Maybe<
                                { __typename?: 'CourseRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'CourseEntity' } & Pick<CourseEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Course' } & Pick<
                                                    Course,
                                                    'name' | 'category' | 'description'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                            image?: Maybe<
                                { __typename?: 'UploadFileEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'UploadFile' } & Pick<
                                                    UploadFile,
                                                    'name' | 'size' | 'url'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                            profileImage?: Maybe<
                                { __typename?: 'UploadFileEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'UploadFile' } & Pick<
                                                    UploadFile,
                                                    'size' | 'url' | 'name'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                            logoImage?: Maybe<
                                { __typename?: 'UploadFileEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'UploadFile' } & Pick<
                                                    UploadFile,
                                                    'size' | 'url' | 'name'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type TrainersQueryVariables = Exact<{
    filters?: Maybe<TrainerFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;

export type TrainersQuery = { __typename?: 'Query' } & {
    trainers?: Maybe<
        { __typename?: 'TrainerEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'TrainerEntity' } & Pick<TrainerEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Trainer' } & Pick<
                            Trainer,
                            | 'trainerTitle'
                            | 'fullName'
                            | 'phoneNumber'
                            | 'firstName'
                            | 'lastName'
                            | 'email'
                            | 'birthdayDate'
                            | 'status'
                            | 'position'
                            | 'body'
                        > & {
                            courses?: Maybe<
                                { __typename?: 'CourseRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'CourseEntity' } & Pick<CourseEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'Course' } & Pick<Course, 'name'>
                                            >;
                                        }
                                    >;
                                }
                            >;
                            profileImage?: Maybe<
                                { __typename?: 'UploadFileEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                            attributes?: Maybe<
                                                { __typename?: 'UploadFile' } & Pick<UploadFile, 'url'>
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'total' | 'page' | 'pageSize' | 'pageCount'
                >;
            };
        }
    >;
};

export type TransactionsQueryVariables = Exact<{
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
    pagination?: Maybe<PaginationArg>;
    filters?: Maybe<TransactionFiltersInput>;
}>;

export type TransactionsQuery = { __typename?: 'Query' } & {
    transactions?: Maybe<
        { __typename?: 'TransactionEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'TransactionEntity' } & Pick<TransactionEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Transaction' } & Pick<
                            Transaction,
                            'createdAt' | 'amount' | 'orderId' | 'currency' | 'status'
                        > & {
                            user?: Maybe<
                                { __typename?: 'UsersPermissionsUserEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UsersPermissionsUserEntity' } & {
                                            attributes?: Maybe<
                                                { __typename?: 'UsersPermissionsUser' } & Pick<
                                                    UsersPermissionsUser,
                                                    'firstName' | 'lastName'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                            group?: Maybe<
                                { __typename?: 'GroupEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'GroupEntity' } & {
                                            attributes?: Maybe<
                                                { __typename?: 'Group' } & Pick<Group, 'name'> & {
                                                    course?: Maybe<
                                                        { __typename?: 'CourseEntityResponse' } & {
                                                            data?: Maybe<
                                                                { __typename?: 'CourseEntity' } & {
                                                                    attributes?: Maybe<
                                                                        { __typename?: 'Course' } & Pick<
                                                                            Course,
                                                                            'name'
                                                                        >
                                                                    >;
                                                                }
                                                            >;
                                                        }
                                                    >;
                                                    course_registers?: Maybe<
                                                        {
                                                            __typename?: 'CourseRegisterRelationResponseCollection';
                                                        } & {
                                                            data: Array<
                                                                { __typename?: 'CourseRegisterEntity' } & {
                                                                    attributes?: Maybe<
                                                                        {
                                                                            __typename?: 'CourseRegister';
                                                                        } & Pick<
                                                                            CourseRegister,
                                                                            'paymentStatus'
                                                                        >
                                                                    >;
                                                                }
                                                            >;
                                                        }
                                                    >;
                                                }
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'pageCount' | 'pageSize' | 'total'>;
            };
        }
    >;
};

export type UsersPermissionsUserQueryVariables = Exact<{
    usersPermissionsUserId?: Maybe<Scalars['ID']>;
}>;

export type UsersPermissionsUserQuery = { __typename?: 'Query' } & {
    usersPermissionsUser?: Maybe<
        { __typename?: 'UsersPermissionsUserEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'UsersPermissionsUserEntity' } & Pick<UsersPermissionsUserEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'UsersPermissionsUser' } & Pick<
                            UsersPermissionsUser,
                            | 'confirmed'
                            | 'dateOfBirth'
                            | 'email'
                            | 'firstName'
                            | 'gender'
                            | 'hasJob'
                            | 'jobTitle'
                            | 'lastName'
                            | 'phoneNumber'
                            | 'schoolName'
                            | 'studyField'
                            | 'trainerTitle'
                            | 'username'
                            | 'companyName'
                        > & {
                            bookmarked_courses?: Maybe<
                                { __typename?: 'BookmarkedCourseRelationResponseCollection' } & {
                                    data: Array<
                                        { __typename?: 'BookmarkedCourseEntity' } & Pick<
                                            BookmarkedCourseEntity,
                                            'id'
                                        > & {
                                            attributes?: Maybe<
                                                { __typename?: 'BookmarkedCourse' } & {
                                                    course?: Maybe<
                                                        { __typename?: 'CourseEntityResponse' } & {
                                                            data?: Maybe<
                                                                { __typename?: 'CourseEntity' } & Pick<
                                                                    CourseEntity,
                                                                    'id'
                                                                > & {
                                                                    attributes?: Maybe<
                                                                        {
                                                                            __typename?: 'Course';
                                                                        } & Pick<
                                                                            Course,
                                                                            | 'name'
                                                                            | 'price'
                                                                            | 'duration'
                                                                            | 'durationType'
                                                                            | 'capacity'
                                                                            | 'count'
                                                                        > & {
                                                                            trainers?: Maybe<
                                                                                {
                                                                                    __typename?: 'TrainerRelationResponseCollection';
                                                                                } & {
                                                                                    data: Array<
                                                                                        {
                                                                                            __typename?: 'TrainerEntity';
                                                                                        } & Pick<
                                                                                            TrainerEntity,
                                                                                            'id'
                                                                                        > & {
                                                                                            attributes?: Maybe<
                                                                                                {
                                                                                                    __typename?: 'Trainer';
                                                                                                } & Pick<
                                                                                                    Trainer,
                                                                                                    | 'fullName'
                                                                                                    | 'position'
                                                                                                > & {
                                                                                                    profileImage?: Maybe<
                                                                                                        {
                                                                                                            __typename?: 'UploadFileEntityResponse';
                                                                                                        } & {
                                                                                                            data?: Maybe<
                                                                                                                {
                                                                                                                    __typename?: 'UploadFileEntity';
                                                                                                                } & {
                                                                                                                    attributes?: Maybe<
                                                                                                                        {
                                                                                                                            __typename?: 'UploadFile';
                                                                                                                        } & Pick<
                                                                                                                            UploadFile,
                                                                                                                            | 'url'
                                                                                                                            | 'name'
                                                                                                                        >
                                                                                                                    >;
                                                                                                                }
                                                                                                            >;
                                                                                                        }
                                                                                                    >;
                                                                                                }
                                                                                            >;
                                                                                        }
                                                                                    >;
                                                                                }
                                                                            >;
                                                                        }
                                                                    >;
                                                                }
                                                            >;
                                                        }
                                                    >;
                                                }
                                            >;
                                        }
                                    >;
                                }
                            >;
                            role?: Maybe<
                                { __typename?: 'UsersPermissionsRoleEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UsersPermissionsRoleEntity' } & Pick<
                                            UsersPermissionsRoleEntity,
                                            'id'
                                        > & {
                                            attributes?: Maybe<
                                                { __typename?: 'UsersPermissionsRole' } & Pick<
                                                    UsersPermissionsRole,
                                                    'name'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type UsersPermissionsUsersQueryVariables = Exact<{
    filters?: Maybe<UsersPermissionsUserFiltersInput>;
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;

export type UsersPermissionsUsersQuery = { __typename?: 'Query' } & {
    usersPermissionsUsers?: Maybe<
        { __typename?: 'UsersPermissionsUserEntityResponseCollection' } & {
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'page' | 'pageCount' | 'pageSize' | 'total'
                >;
            };
            data: Array<
                { __typename?: 'UsersPermissionsUserEntity' } & Pick<UsersPermissionsUserEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'UsersPermissionsUser' } & Pick<
                            UsersPermissionsUser,
                            | 'firstName'
                            | 'lastName'
                            | 'email'
                            | 'gender'
                            | 'dateOfBirth'
                            | 'phoneNumber'
                            | 'confirmed'
                        > & {
                            role?: Maybe<
                                { __typename?: 'UsersPermissionsRoleEntityResponse' } & {
                                    data?: Maybe<
                                        { __typename?: 'UsersPermissionsRoleEntity' } & Pick<
                                            UsersPermissionsRoleEntity,
                                            'id'
                                        > & {
                                            attributes?: Maybe<
                                                { __typename?: 'UsersPermissionsRole' } & Pick<
                                                    UsersPermissionsRole,
                                                    'name'
                                                >
                                            >;
                                        }
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >;
};

export type UsersPermissionsRolesQueryVariables = Exact<{ [key: string]: never }>;

export type UsersPermissionsRolesQuery = { __typename?: 'Query' } & {
    usersPermissionsRoles?: Maybe<
        { __typename?: 'UsersPermissionsRoleEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'UsersPermissionsRoleEntity' } & Pick<UsersPermissionsRoleEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'UsersPermissionsRole' } & Pick<UsersPermissionsRole, 'name'>
                    >;
                }
            >;
        }
    >;
};

export type VideoByAdminQueryVariables = Exact<{
    videoId?: Maybe<Scalars['ID']>;
}>;

export type VideoByAdminQuery = { __typename?: 'Query' } & {
    video?: Maybe<
        { __typename?: 'VideoEntityResponse' } & {
            data?: Maybe<
                { __typename?: 'VideoEntity' } & Pick<VideoEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Video' } & Pick<
                            Video,
                            | 'body'
                            | 'category'
                            | 'createdAt'
                            | 'slug'
                            | 'status'
                            | 'title'
                            | 'videoId'
                            | 'viewCount'
                        > & {
                            coverImage: { __typename?: 'UploadFileEntityResponse' } & {
                                data?: Maybe<
                                    { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                        attributes?: Maybe<
                                            { __typename?: 'UploadFile' } & Pick<UploadFile, 'name' | 'url'>
                                        >;
                                    }
                                >;
                            };
                        }
                    >;
                }
            >;
        }
    >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
    me?: Maybe<
        { __typename?: 'UsersPermissionsMe' } & Pick<
            UsersPermissionsMe,
            | 'id'
            | 'username'
            | 'email'
            | 'confirmed'
            | 'blocked'
            | 'lastName'
            | 'firstName'
            | 'phoneNumber'
            | 'gender'
            | 'dateOfBirth'
            | 'companyName'
            | 'schoolName'
            | 'hasJob'
            | 'jobTitle'
            | 'studyField'
        > & {
            role?: Maybe<
                { __typename?: 'UsersPermissionsMeRole' } & Pick<
                    UsersPermissionsMeRole,
                    'id' | 'name' | 'description' | 'type'
                >
            >;
        }
    >;
};

export type VideoQueryVariables = Exact<{
    filters?: Maybe<VideoFiltersInput>;
}>;

export type VideoQuery = { __typename?: 'Query' } & {
    videos?: Maybe<
        { __typename?: 'VideoEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'VideoEntity' } & Pick<VideoEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Video' } & Pick<
                            Video,
                            'title' | 'body' | 'slug' | 'category' | 'videoId' | 'createdAt'
                        > & {
                            coverImage: { __typename?: 'UploadFileEntityResponse' } & {
                                data?: Maybe<
                                    { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                        attributes?: Maybe<
                                            { __typename?: 'UploadFile' } & Pick<UploadFile, 'url'>
                                        >;
                                    }
                                >;
                            };
                        }
                    >;
                }
            >;
        }
    >;
};

export type VideosQueryVariables = Exact<{
    pagination?: Maybe<PaginationArg>;
    sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
    filters?: Maybe<VideoFiltersInput>;
}>;

export type VideosQuery = { __typename?: 'Query' } & {
    videos?: Maybe<
        { __typename?: 'VideoEntityResponseCollection' } & {
            data: Array<
                { __typename?: 'VideoEntity' } & Pick<VideoEntity, 'id'> & {
                    attributes?: Maybe<
                        { __typename?: 'Video' } & Pick<
                            Video,
                            'title' | 'body' | 'slug' | 'status' | 'category' | 'createdAt'
                        > & {
                            coverImage: { __typename?: 'UploadFileEntityResponse' } & {
                                data?: Maybe<
                                    { __typename?: 'UploadFileEntity' } & Pick<UploadFileEntity, 'id'> & {
                                        attributes?: Maybe<
                                            { __typename?: 'UploadFile' } & Pick<UploadFile, 'url'>
                                        >;
                                    }
                                >;
                            };
                        }
                    >;
                }
            >;
            meta: { __typename?: 'ResponseCollectionMeta' } & {
                pagination: { __typename?: 'Pagination' } & Pick<
                    Pagination,
                    'pageCount' | 'total' | 'pageSize' | 'page'
                >;
            };
        }
    >;
};

export const CreateBookmarkedCourseDocument = gql`
    mutation CreateBookmarkedCourse($data: BookmarkedCourseInput!) {
        createBookmarkedCourse(data: $data) {
            data {
                id
            }
        }
    }
`;
export type CreateBookmarkedCourseMutationFn = Apollo.MutationFunction<
    CreateBookmarkedCourseMutation,
    CreateBookmarkedCourseMutationVariables
>;

/**
 * __useCreateBookmarkedCourseMutation__
 *
 * To run a mutation, you first call `useCreateBookmarkedCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookmarkedCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookmarkedCourseMutation, { data, loading, error }] = useCreateBookmarkedCourseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBookmarkedCourseMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateBookmarkedCourseMutation, CreateBookmarkedCourseMutationVariables>,
) {
    return Apollo.useMutation<CreateBookmarkedCourseMutation, CreateBookmarkedCourseMutationVariables>(
        CreateBookmarkedCourseDocument,
        baseOptions,
    );
}
export type CreateBookmarkedCourseMutationHookResult = ReturnType<typeof useCreateBookmarkedCourseMutation>;
export type CreateBookmarkedCourseMutationResult = Apollo.MutationResult<CreateBookmarkedCourseMutation>;
export type CreateBookmarkedCourseMutationOptions = Apollo.BaseMutationOptions<
    CreateBookmarkedCourseMutation,
    CreateBookmarkedCourseMutationVariables
>;
export const CreateCallbackDocument = gql`
    mutation CreateCallback($data: CallbackInput!) {
        createCallback(data: $data) {
            data {
                id
                attributes {
                    phoneNumber
                }
            }
        }
    }
`;
export type CreateCallbackMutationFn = Apollo.MutationFunction<CreateCallbackMutation, CreateCallbackMutationVariables>;

/**
 * __useCreateCallbackMutation__
 *
 * To run a mutation, you first call `useCreateCallbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCallbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCallbackMutation, { data, loading, error }] = useCreateCallbackMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCallbackMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateCallbackMutation, CreateCallbackMutationVariables>,
) {
    return Apollo.useMutation<CreateCallbackMutation, CreateCallbackMutationVariables>(
        CreateCallbackDocument,
        baseOptions,
    );
}
export type CreateCallbackMutationHookResult = ReturnType<typeof useCreateCallbackMutation>;
export type CreateCallbackMutationResult = Apollo.MutationResult<CreateCallbackMutation>;
export type CreateCallbackMutationOptions = Apollo.BaseMutationOptions<
    CreateCallbackMutation,
    CreateCallbackMutationVariables
>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($data: MessageInput!) {
        createMessage(data: $data) {
            data {
                id
            }
        }
    }
`;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMessageMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>,
) {
    return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(
        CreateMessageDocument,
        baseOptions,
    );
}
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<
    CreateMessageMutation,
    CreateMessageMutationVariables
>;
export const CreateSubscriberDocument = gql`
    mutation CreateSubscriber($data: SubscriberInput!) {
        createSubscriber(data: $data) {
            data {
                id
                attributes {
                    email
                    createdAt
                }
            }
        }
    }
`;
export type CreateSubscriberMutationFn = Apollo.MutationFunction<
    CreateSubscriberMutation,
    CreateSubscriberMutationVariables
>;

/**
 * __useCreateSubscriberMutation__
 *
 * To run a mutation, you first call `useCreateSubscriberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriberMutation, { data, loading, error }] = useCreateSubscriberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSubscriberMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateSubscriberMutation, CreateSubscriberMutationVariables>,
) {
    return Apollo.useMutation<CreateSubscriberMutation, CreateSubscriberMutationVariables>(
        CreateSubscriberDocument,
        baseOptions,
    );
}
export type CreateSubscriberMutationHookResult = ReturnType<typeof useCreateSubscriberMutation>;
export type CreateSubscriberMutationResult = Apollo.MutationResult<CreateSubscriberMutation>;
export type CreateSubscriberMutationOptions = Apollo.BaseMutationOptions<
    CreateSubscriberMutation,
    CreateSubscriberMutationVariables
>;
export const DeleteBookmarkedCourseDocument = gql`
    mutation DeleteBookmarkedCourse($deleteBookmarkedCourseId: ID!) {
        deleteBookmarkedCourse(id: $deleteBookmarkedCourseId) {
            data {
                id
            }
        }
    }
`;
export type DeleteBookmarkedCourseMutationFn = Apollo.MutationFunction<
    DeleteBookmarkedCourseMutation,
    DeleteBookmarkedCourseMutationVariables
>;

/**
 * __useDeleteBookmarkedCourseMutation__
 *
 * To run a mutation, you first call `useDeleteBookmarkedCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookmarkedCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookmarkedCourseMutation, { data, loading, error }] = useDeleteBookmarkedCourseMutation({
 *   variables: {
 *      deleteBookmarkedCourseId: // value for 'deleteBookmarkedCourseId'
 *   },
 * });
 */
export function useDeleteBookmarkedCourseMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteBookmarkedCourseMutation, DeleteBookmarkedCourseMutationVariables>,
) {
    return Apollo.useMutation<DeleteBookmarkedCourseMutation, DeleteBookmarkedCourseMutationVariables>(
        DeleteBookmarkedCourseDocument,
        baseOptions,
    );
}
export type DeleteBookmarkedCourseMutationHookResult = ReturnType<typeof useDeleteBookmarkedCourseMutation>;
export type DeleteBookmarkedCourseMutationResult = Apollo.MutationResult<DeleteBookmarkedCourseMutation>;
export type DeleteBookmarkedCourseMutationOptions = Apollo.BaseMutationOptions<
    DeleteBookmarkedCourseMutation,
    DeleteBookmarkedCourseMutationVariables
>;
export const EmailConfirmationDocument = gql`
    mutation EmailConfirmation($confirmation: String!) {
        emailConfirmation(confirmation: $confirmation) {
            jwt
        }
    }
`;
export type EmailConfirmationMutationFn = Apollo.MutationFunction<
    EmailConfirmationMutation,
    EmailConfirmationMutationVariables
>;

/**
 * __useEmailConfirmationMutation__
 *
 * To run a mutation, you first call `useEmailConfirmationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmailConfirmationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailConfirmationMutation, { data, loading, error }] = useEmailConfirmationMutation({
 *   variables: {
 *      confirmation: // value for 'confirmation'
 *   },
 * });
 */
export function useEmailConfirmationMutation(
    baseOptions?: Apollo.MutationHookOptions<EmailConfirmationMutation, EmailConfirmationMutationVariables>,
) {
    return Apollo.useMutation<EmailConfirmationMutation, EmailConfirmationMutationVariables>(
        EmailConfirmationDocument,
        baseOptions,
    );
}
export type EmailConfirmationMutationHookResult = ReturnType<typeof useEmailConfirmationMutation>;
export type EmailConfirmationMutationResult = Apollo.MutationResult<EmailConfirmationMutation>;
export type EmailConfirmationMutationOptions = Apollo.BaseMutationOptions<
    EmailConfirmationMutation,
    EmailConfirmationMutationVariables
>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email) {
            ok
        }
    }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>,
) {
    return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
        ForgotPasswordDocument,
        baseOptions,
    );
}
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
    mutation Login($input: UsersPermissionsLoginInput!) {
        login(input: $input) {
            jwt
            user {
                id
                username
                email
                confirmed
                blocked
                firstName
                lastName
            }
        }
    }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateBlogDocument = gql`
    mutation CreateBlog($data: BlogInput!) {
        createBlog(data: $data) {
            data {
                id
                attributes {
                    title
                }
            }
        }
    }
`;
export type CreateBlogMutationFn = Apollo.MutationFunction<CreateBlogMutation, CreateBlogMutationVariables>;

/**
 * __useCreateBlogMutation__
 *
 * To run a mutation, you first call `useCreateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogMutation, { data, loading, error }] = useCreateBlogMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBlogMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateBlogMutation, CreateBlogMutationVariables>,
) {
    return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(CreateBlogDocument, baseOptions);
}
export type CreateBlogMutationHookResult = ReturnType<typeof useCreateBlogMutation>;
export type CreateBlogMutationResult = Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationOptions = Apollo.BaseMutationOptions<CreateBlogMutation, CreateBlogMutationVariables>;
export const CreateBroadcastSerieDocument = gql`
    mutation CreateBroadcastSerie($data: BroadcastSerieInput!) {
        createBroadcastSerie(data: $data) {
            data {
                id
                attributes {
                    title
                    slug
                }
            }
        }
    }
`;
export type CreateBroadcastSerieMutationFn = Apollo.MutationFunction<
    CreateBroadcastSerieMutation,
    CreateBroadcastSerieMutationVariables
>;

/**
 * __useCreateBroadcastSerieMutation__
 *
 * To run a mutation, you first call `useCreateBroadcastSerieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBroadcastSerieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBroadcastSerieMutation, { data, loading, error }] = useCreateBroadcastSerieMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBroadcastSerieMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateBroadcastSerieMutation, CreateBroadcastSerieMutationVariables>,
) {
    return Apollo.useMutation<CreateBroadcastSerieMutation, CreateBroadcastSerieMutationVariables>(
        CreateBroadcastSerieDocument,
        baseOptions,
    );
}
export type CreateBroadcastSerieMutationHookResult = ReturnType<typeof useCreateBroadcastSerieMutation>;
export type CreateBroadcastSerieMutationResult = Apollo.MutationResult<CreateBroadcastSerieMutation>;
export type CreateBroadcastSerieMutationOptions = Apollo.BaseMutationOptions<
    CreateBroadcastSerieMutation,
    CreateBroadcastSerieMutationVariables
>;
export const CreateBroadcastDocument = gql`
    mutation CreateBroadcast($data: BroadcastInput!) {
        createBroadcast(data: $data) {
            data {
                id
                attributes {
                    title
                }
            }
        }
    }
`;
export type CreateBroadcastMutationFn = Apollo.MutationFunction<
    CreateBroadcastMutation,
    CreateBroadcastMutationVariables
>;

/**
 * __useCreateBroadcastMutation__
 *
 * To run a mutation, you first call `useCreateBroadcastMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBroadcastMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBroadcastMutation, { data, loading, error }] = useCreateBroadcastMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBroadcastMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateBroadcastMutation, CreateBroadcastMutationVariables>,
) {
    return Apollo.useMutation<CreateBroadcastMutation, CreateBroadcastMutationVariables>(
        CreateBroadcastDocument,
        baseOptions,
    );
}
export type CreateBroadcastMutationHookResult = ReturnType<typeof useCreateBroadcastMutation>;
export type CreateBroadcastMutationResult = Apollo.MutationResult<CreateBroadcastMutation>;
export type CreateBroadcastMutationOptions = Apollo.BaseMutationOptions<
    CreateBroadcastMutation,
    CreateBroadcastMutationVariables
>;
export const CreateCourseRegisterDocument = gql`
    mutation CreateCourseRegister($data: CourseRegisterInput!) {
        createCourseRegister(data: $data) {
            data {
                id
            }
        }
    }
`;
export type CreateCourseRegisterMutationFn = Apollo.MutationFunction<
    CreateCourseRegisterMutation,
    CreateCourseRegisterMutationVariables
>;

/**
 * __useCreateCourseRegisterMutation__
 *
 * To run a mutation, you first call `useCreateCourseRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseRegisterMutation, { data, loading, error }] = useCreateCourseRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCourseRegisterMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateCourseRegisterMutation, CreateCourseRegisterMutationVariables>,
) {
    return Apollo.useMutation<CreateCourseRegisterMutation, CreateCourseRegisterMutationVariables>(
        CreateCourseRegisterDocument,
        baseOptions,
    );
}
export type CreateCourseRegisterMutationHookResult = ReturnType<typeof useCreateCourseRegisterMutation>;
export type CreateCourseRegisterMutationResult = Apollo.MutationResult<CreateCourseRegisterMutation>;
export type CreateCourseRegisterMutationOptions = Apollo.BaseMutationOptions<
    CreateCourseRegisterMutation,
    CreateCourseRegisterMutationVariables
>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($data: CourseInput!) {
        createCourse(data: $data) {
            data {
                id
            }
        }
    }
`;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCourseMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>,
) {
    return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, baseOptions);
}
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<
    CreateCourseMutation,
    CreateCourseMutationVariables
>;
export const CreateEmployeeDocument = gql`
    mutation CreateEmployee($data: EmployeeInput!) {
        createEmployee(data: $data) {
            data {
                id
            }
        }
    }
`;
export type CreateEmployeeMutationFn = Apollo.MutationFunction<CreateEmployeeMutation, CreateEmployeeMutationVariables>;

/**
 * __useCreateEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeMutation, { data, loading, error }] = useCreateEmployeeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateEmployeeMutation, CreateEmployeeMutationVariables>,
) {
    return Apollo.useMutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>(
        CreateEmployeeDocument,
        baseOptions,
    );
}
export type CreateEmployeeMutationHookResult = ReturnType<typeof useCreateEmployeeMutation>;
export type CreateEmployeeMutationResult = Apollo.MutationResult<CreateEmployeeMutation>;
export type CreateEmployeeMutationOptions = Apollo.BaseMutationOptions<
    CreateEmployeeMutation,
    CreateEmployeeMutationVariables
>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($data: GroupInput!) {
        createGroup(data: $data) {
            data {
                id
                attributes {
                    name
                }
            }
        }
    }
`;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGroupMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>,
) {
    return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, baseOptions);
}
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateSliderShowDocument = gql`
    mutation CreateSliderShow($data: SliderShowInput!) {
        createSliderShow(data: $data) {
            data {
                id
            }
        }
    }
`;
export type CreateSliderShowMutationFn = Apollo.MutationFunction<
    CreateSliderShowMutation,
    CreateSliderShowMutationVariables
>;

/**
 * __useCreateSliderShowMutation__
 *
 * To run a mutation, you first call `useCreateSliderShowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSliderShowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSliderShowMutation, { data, loading, error }] = useCreateSliderShowMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSliderShowMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateSliderShowMutation, CreateSliderShowMutationVariables>,
) {
    return Apollo.useMutation<CreateSliderShowMutation, CreateSliderShowMutationVariables>(
        CreateSliderShowDocument,
        baseOptions,
    );
}
export type CreateSliderShowMutationHookResult = ReturnType<typeof useCreateSliderShowMutation>;
export type CreateSliderShowMutationResult = Apollo.MutationResult<CreateSliderShowMutation>;
export type CreateSliderShowMutationOptions = Apollo.BaseMutationOptions<
    CreateSliderShowMutation,
    CreateSliderShowMutationVariables
>;
export const CreateTrainerDocument = gql`
    mutation CreateTrainer($data: TrainerInput!) {
        createTrainer(data: $data) {
            data {
                id
            }
        }
    }
`;
export type CreateTrainerMutationFn = Apollo.MutationFunction<CreateTrainerMutation, CreateTrainerMutationVariables>;

/**
 * __useCreateTrainerMutation__
 *
 * To run a mutation, you first call `useCreateTrainerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrainerMutation, { data, loading, error }] = useCreateTrainerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTrainerMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateTrainerMutation, CreateTrainerMutationVariables>,
) {
    return Apollo.useMutation<CreateTrainerMutation, CreateTrainerMutationVariables>(
        CreateTrainerDocument,
        baseOptions,
    );
}
export type CreateTrainerMutationHookResult = ReturnType<typeof useCreateTrainerMutation>;
export type CreateTrainerMutationResult = Apollo.MutationResult<CreateTrainerMutation>;
export type CreateTrainerMutationOptions = Apollo.BaseMutationOptions<
    CreateTrainerMutation,
    CreateTrainerMutationVariables
>;
export const CreateVideoDocument = gql`
    mutation CreateVideo($data: VideoInput!) {
        createVideo(data: $data) {
            data {
                id
                attributes {
                    title
                }
            }
        }
    }
`;
export type CreateVideoMutationFn = Apollo.MutationFunction<CreateVideoMutation, CreateVideoMutationVariables>;

/**
 * __useCreateVideoMutation__
 *
 * To run a mutation, you first call `useCreateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVideoMutation, { data, loading, error }] = useCreateVideoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateVideoMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateVideoMutation, CreateVideoMutationVariables>,
) {
    return Apollo.useMutation<CreateVideoMutation, CreateVideoMutationVariables>(CreateVideoDocument, baseOptions);
}
export type CreateVideoMutationHookResult = ReturnType<typeof useCreateVideoMutation>;
export type CreateVideoMutationResult = Apollo.MutationResult<CreateVideoMutation>;
export type CreateVideoMutationOptions = Apollo.BaseMutationOptions<CreateVideoMutation, CreateVideoMutationVariables>;
export const DeleteBlogDocument = gql`
    mutation DeleteBlog($deleteBlogId: ID!) {
        deleteBlog(id: $deleteBlogId) {
            data {
                id
                attributes {
                    body
                }
            }
        }
    }
`;
export type DeleteBlogMutationFn = Apollo.MutationFunction<DeleteBlogMutation, DeleteBlogMutationVariables>;

/**
 * __useDeleteBlogMutation__
 *
 * To run a mutation, you first call `useDeleteBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBlogMutation, { data, loading, error }] = useDeleteBlogMutation({
 *   variables: {
 *      deleteBlogId: // value for 'deleteBlogId'
 *   },
 * });
 */
export function useDeleteBlogMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteBlogMutation, DeleteBlogMutationVariables>,
) {
    return Apollo.useMutation<DeleteBlogMutation, DeleteBlogMutationVariables>(DeleteBlogDocument, baseOptions);
}
export type DeleteBlogMutationHookResult = ReturnType<typeof useDeleteBlogMutation>;
export type DeleteBlogMutationResult = Apollo.MutationResult<DeleteBlogMutation>;
export type DeleteBlogMutationOptions = Apollo.BaseMutationOptions<DeleteBlogMutation, DeleteBlogMutationVariables>;
export const DeleteBroadcastSerieDocument = gql`
    mutation DeleteBroadcastSerie($deleteBroadcastSerieId: ID!) {
        deleteBroadcastSerie(id: $deleteBroadcastSerieId) {
            data {
                id
                attributes {
                    title
                }
            }
        }
    }
`;
export type DeleteBroadcastSerieMutationFn = Apollo.MutationFunction<
    DeleteBroadcastSerieMutation,
    DeleteBroadcastSerieMutationVariables
>;

/**
 * __useDeleteBroadcastSerieMutation__
 *
 * To run a mutation, you first call `useDeleteBroadcastSerieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBroadcastSerieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBroadcastSerieMutation, { data, loading, error }] = useDeleteBroadcastSerieMutation({
 *   variables: {
 *      deleteBroadcastSerieId: // value for 'deleteBroadcastSerieId'
 *   },
 * });
 */
export function useDeleteBroadcastSerieMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteBroadcastSerieMutation, DeleteBroadcastSerieMutationVariables>,
) {
    return Apollo.useMutation<DeleteBroadcastSerieMutation, DeleteBroadcastSerieMutationVariables>(
        DeleteBroadcastSerieDocument,
        baseOptions,
    );
}
export type DeleteBroadcastSerieMutationHookResult = ReturnType<typeof useDeleteBroadcastSerieMutation>;
export type DeleteBroadcastSerieMutationResult = Apollo.MutationResult<DeleteBroadcastSerieMutation>;
export type DeleteBroadcastSerieMutationOptions = Apollo.BaseMutationOptions<
    DeleteBroadcastSerieMutation,
    DeleteBroadcastSerieMutationVariables
>;
export const DeleteBroadcastDocument = gql`
    mutation DeleteBroadcast($deleteBroadcastId: ID!) {
        deleteBroadcast(id: $deleteBroadcastId) {
            data {
                id
                attributes {
                    title
                }
            }
        }
    }
`;
export type DeleteBroadcastMutationFn = Apollo.MutationFunction<
    DeleteBroadcastMutation,
    DeleteBroadcastMutationVariables
>;

/**
 * __useDeleteBroadcastMutation__
 *
 * To run a mutation, you first call `useDeleteBroadcastMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBroadcastMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBroadcastMutation, { data, loading, error }] = useDeleteBroadcastMutation({
 *   variables: {
 *      deleteBroadcastId: // value for 'deleteBroadcastId'
 *   },
 * });
 */
export function useDeleteBroadcastMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteBroadcastMutation, DeleteBroadcastMutationVariables>,
) {
    return Apollo.useMutation<DeleteBroadcastMutation, DeleteBroadcastMutationVariables>(
        DeleteBroadcastDocument,
        baseOptions,
    );
}
export type DeleteBroadcastMutationHookResult = ReturnType<typeof useDeleteBroadcastMutation>;
export type DeleteBroadcastMutationResult = Apollo.MutationResult<DeleteBroadcastMutation>;
export type DeleteBroadcastMutationOptions = Apollo.BaseMutationOptions<
    DeleteBroadcastMutation,
    DeleteBroadcastMutationVariables
>;
export const DeleteCallbackDocument = gql`
    mutation DeleteCallback($deleteCallbackId: ID!) {
        deleteCallback(id: $deleteCallbackId) {
            data {
                id
                attributes {
                    phoneNumber
                }
            }
        }
    }
`;
export type DeleteCallbackMutationFn = Apollo.MutationFunction<DeleteCallbackMutation, DeleteCallbackMutationVariables>;

/**
 * __useDeleteCallbackMutation__
 *
 * To run a mutation, you first call `useDeleteCallbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCallbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCallbackMutation, { data, loading, error }] = useDeleteCallbackMutation({
 *   variables: {
 *      deleteCallbackId: // value for 'deleteCallbackId'
 *   },
 * });
 */
export function useDeleteCallbackMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteCallbackMutation, DeleteCallbackMutationVariables>,
) {
    return Apollo.useMutation<DeleteCallbackMutation, DeleteCallbackMutationVariables>(
        DeleteCallbackDocument,
        baseOptions,
    );
}
export type DeleteCallbackMutationHookResult = ReturnType<typeof useDeleteCallbackMutation>;
export type DeleteCallbackMutationResult = Apollo.MutationResult<DeleteCallbackMutation>;
export type DeleteCallbackMutationOptions = Apollo.BaseMutationOptions<
    DeleteCallbackMutation,
    DeleteCallbackMutationVariables
>;
export const DeleteCourseRegisterDocument = gql`
    mutation DeleteCourseRegister($deleteCourseRegisterId: ID!) {
        deleteCourseRegister(id: $deleteCourseRegisterId) {
            data {
                id
            }
        }
    }
`;
export type DeleteCourseRegisterMutationFn = Apollo.MutationFunction<
    DeleteCourseRegisterMutation,
    DeleteCourseRegisterMutationVariables
>;

/**
 * __useDeleteCourseRegisterMutation__
 *
 * To run a mutation, you first call `useDeleteCourseRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseRegisterMutation, { data, loading, error }] = useDeleteCourseRegisterMutation({
 *   variables: {
 *      deleteCourseRegisterId: // value for 'deleteCourseRegisterId'
 *   },
 * });
 */
export function useDeleteCourseRegisterMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteCourseRegisterMutation, DeleteCourseRegisterMutationVariables>,
) {
    return Apollo.useMutation<DeleteCourseRegisterMutation, DeleteCourseRegisterMutationVariables>(
        DeleteCourseRegisterDocument,
        baseOptions,
    );
}
export type DeleteCourseRegisterMutationHookResult = ReturnType<typeof useDeleteCourseRegisterMutation>;
export type DeleteCourseRegisterMutationResult = Apollo.MutationResult<DeleteCourseRegisterMutation>;
export type DeleteCourseRegisterMutationOptions = Apollo.BaseMutationOptions<
    DeleteCourseRegisterMutation,
    DeleteCourseRegisterMutationVariables
>;
export const DeleteEmployeeDocument = gql`
    mutation DeleteEmployee($deleteEmployeeId: ID!) {
        deleteEmployee(id: $deleteEmployeeId) {
            data {
                id
            }
        }
    }
`;
export type DeleteEmployeeMutationFn = Apollo.MutationFunction<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>;

/**
 * __useDeleteEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmployeeMutation, { data, loading, error }] = useDeleteEmployeeMutation({
 *   variables: {
 *      deleteEmployeeId: // value for 'deleteEmployeeId'
 *   },
 * });
 */
export function useDeleteEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>,
) {
    return Apollo.useMutation<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>(
        DeleteEmployeeDocument,
        baseOptions,
    );
}
export type DeleteEmployeeMutationHookResult = ReturnType<typeof useDeleteEmployeeMutation>;
export type DeleteEmployeeMutationResult = Apollo.MutationResult<DeleteEmployeeMutation>;
export type DeleteEmployeeMutationOptions = Apollo.BaseMutationOptions<
    DeleteEmployeeMutation,
    DeleteEmployeeMutationVariables
>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($deleteMessageId: ID!) {
        deleteMessage(id: $deleteMessageId) {
            data {
                id
            }
        }
    }
`;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      deleteMessageId: // value for 'deleteMessageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>,
) {
    return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(
        DeleteMessageDocument,
        baseOptions,
    );
}
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<
    DeleteMessageMutation,
    DeleteMessageMutationVariables
>;
export const DeleteUsersPermissionsUserDocument = gql`
    mutation DeleteUsersPermissionsUser($deleteUsersPermissionsUserId: ID!) {
        deleteUsersPermissionsUser(id: $deleteUsersPermissionsUserId) {
            data {
                id
            }
        }
    }
`;
export type DeleteUsersPermissionsUserMutationFn = Apollo.MutationFunction<
    DeleteUsersPermissionsUserMutation,
    DeleteUsersPermissionsUserMutationVariables
>;

/**
 * __useDeleteUsersPermissionsUserMutation__
 *
 * To run a mutation, you first call `useDeleteUsersPermissionsUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUsersPermissionsUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUsersPermissionsUserMutation, { data, loading, error }] = useDeleteUsersPermissionsUserMutation({
 *   variables: {
 *      deleteUsersPermissionsUserId: // value for 'deleteUsersPermissionsUserId'
 *   },
 * });
 */
export function useDeleteUsersPermissionsUserMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeleteUsersPermissionsUserMutation,
        DeleteUsersPermissionsUserMutationVariables
    >,
) {
    return Apollo.useMutation<DeleteUsersPermissionsUserMutation, DeleteUsersPermissionsUserMutationVariables>(
        DeleteUsersPermissionsUserDocument,
        baseOptions,
    );
}
export type DeleteUsersPermissionsUserMutationHookResult = ReturnType<typeof useDeleteUsersPermissionsUserMutation>;
export type DeleteUsersPermissionsUserMutationResult = Apollo.MutationResult<DeleteUsersPermissionsUserMutation>;
export type DeleteUsersPermissionsUserMutationOptions = Apollo.BaseMutationOptions<
    DeleteUsersPermissionsUserMutation,
    DeleteUsersPermissionsUserMutationVariables
>;
export const DeleteSliderShowDocument = gql`
    mutation DeleteSliderShow($deleteSliderShowId: ID!) {
        deleteSliderShow(id: $deleteSliderShowId) {
            data {
                id
            }
        }
    }
`;
export type DeleteSliderShowMutationFn = Apollo.MutationFunction<
    DeleteSliderShowMutation,
    DeleteSliderShowMutationVariables
>;

/**
 * __useDeleteSliderShowMutation__
 *
 * To run a mutation, you first call `useDeleteSliderShowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSliderShowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSliderShowMutation, { data, loading, error }] = useDeleteSliderShowMutation({
 *   variables: {
 *      deleteSliderShowId: // value for 'deleteSliderShowId'
 *   },
 * });
 */
export function useDeleteSliderShowMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteSliderShowMutation, DeleteSliderShowMutationVariables>,
) {
    return Apollo.useMutation<DeleteSliderShowMutation, DeleteSliderShowMutationVariables>(
        DeleteSliderShowDocument,
        baseOptions,
    );
}
export type DeleteSliderShowMutationHookResult = ReturnType<typeof useDeleteSliderShowMutation>;
export type DeleteSliderShowMutationResult = Apollo.MutationResult<DeleteSliderShowMutation>;
export type DeleteSliderShowMutationOptions = Apollo.BaseMutationOptions<
    DeleteSliderShowMutation,
    DeleteSliderShowMutationVariables
>;
export const DeleteSubscriberDocument = gql`
    mutation DeleteSubscriber($deleteSubscriberId: ID!) {
        deleteSubscriber(id: $deleteSubscriberId) {
            data {
                id
                attributes {
                    email
                }
            }
        }
    }
`;
export type DeleteSubscriberMutationFn = Apollo.MutationFunction<
    DeleteSubscriberMutation,
    DeleteSubscriberMutationVariables
>;

/**
 * __useDeleteSubscriberMutation__
 *
 * To run a mutation, you first call `useDeleteSubscriberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubscriberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubscriberMutation, { data, loading, error }] = useDeleteSubscriberMutation({
 *   variables: {
 *      deleteSubscriberId: // value for 'deleteSubscriberId'
 *   },
 * });
 */
export function useDeleteSubscriberMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteSubscriberMutation, DeleteSubscriberMutationVariables>,
) {
    return Apollo.useMutation<DeleteSubscriberMutation, DeleteSubscriberMutationVariables>(
        DeleteSubscriberDocument,
        baseOptions,
    );
}
export type DeleteSubscriberMutationHookResult = ReturnType<typeof useDeleteSubscriberMutation>;
export type DeleteSubscriberMutationResult = Apollo.MutationResult<DeleteSubscriberMutation>;
export type DeleteSubscriberMutationOptions = Apollo.BaseMutationOptions<
    DeleteSubscriberMutation,
    DeleteSubscriberMutationVariables
>;
export const DeleteTrainerDocument = gql`
    mutation DeleteTrainer($deleteTrainerId: ID!) {
        deleteTrainer(id: $deleteTrainerId) {
            data {
                id
            }
        }
    }
`;
export type DeleteTrainerMutationFn = Apollo.MutationFunction<DeleteTrainerMutation, DeleteTrainerMutationVariables>;

/**
 * __useDeleteTrainerMutation__
 *
 * To run a mutation, you first call `useDeleteTrainerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTrainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTrainerMutation, { data, loading, error }] = useDeleteTrainerMutation({
 *   variables: {
 *      deleteTrainerId: // value for 'deleteTrainerId'
 *   },
 * });
 */
export function useDeleteTrainerMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteTrainerMutation, DeleteTrainerMutationVariables>,
) {
    return Apollo.useMutation<DeleteTrainerMutation, DeleteTrainerMutationVariables>(
        DeleteTrainerDocument,
        baseOptions,
    );
}
export type DeleteTrainerMutationHookResult = ReturnType<typeof useDeleteTrainerMutation>;
export type DeleteTrainerMutationResult = Apollo.MutationResult<DeleteTrainerMutation>;
export type DeleteTrainerMutationOptions = Apollo.BaseMutationOptions<
    DeleteTrainerMutation,
    DeleteTrainerMutationVariables
>;
export const DeleteVideoDocument = gql`
    mutation DeleteVideo($deleteVideoId: ID!) {
        deleteVideo(id: $deleteVideoId) {
            data {
                id
                attributes {
                    title
                }
            }
        }
    }
`;
export type DeleteVideoMutationFn = Apollo.MutationFunction<DeleteVideoMutation, DeleteVideoMutationVariables>;

/**
 * __useDeleteVideoMutation__
 *
 * To run a mutation, you first call `useDeleteVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVideoMutation, { data, loading, error }] = useDeleteVideoMutation({
 *   variables: {
 *      deleteVideoId: // value for 'deleteVideoId'
 *   },
 * });
 */
export function useDeleteVideoMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteVideoMutation, DeleteVideoMutationVariables>,
) {
    return Apollo.useMutation<DeleteVideoMutation, DeleteVideoMutationVariables>(DeleteVideoDocument, baseOptions);
}
export type DeleteVideoMutationHookResult = ReturnType<typeof useDeleteVideoMutation>;
export type DeleteVideoMutationResult = Apollo.MutationResult<DeleteVideoMutation>;
export type DeleteVideoMutationOptions = Apollo.BaseMutationOptions<DeleteVideoMutation, DeleteVideoMutationVariables>;
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($deleteGroupId: ID!) {
        deleteGroup(id: $deleteGroupId) {
            data {
                id
            }
        }
    }
`;
export type DeleteGroupMutationFn = Apollo.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      deleteGroupId: // value for 'deleteGroupId'
 *   },
 * });
 */
export function useDeleteGroupMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteGroupMutation, DeleteGroupMutationVariables>,
) {
    return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, baseOptions);
}
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const UpdateBlogDocument = gql`
    mutation UpdateBlog($updateBlogId: ID!, $data: BlogInput!) {
        updateBlog(id: $updateBlogId, data: $data) {
            data {
                id
                attributes {
                    title
                }
            }
        }
    }
`;
export type UpdateBlogMutationFn = Apollo.MutationFunction<UpdateBlogMutation, UpdateBlogMutationVariables>;

/**
 * __useUpdateBlogMutation__
 *
 * To run a mutation, you first call `useUpdateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBlogMutation, { data, loading, error }] = useUpdateBlogMutation({
 *   variables: {
 *      updateBlogId: // value for 'updateBlogId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBlogMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateBlogMutation, UpdateBlogMutationVariables>,
) {
    return Apollo.useMutation<UpdateBlogMutation, UpdateBlogMutationVariables>(UpdateBlogDocument, baseOptions);
}
export type UpdateBlogMutationHookResult = ReturnType<typeof useUpdateBlogMutation>;
export type UpdateBlogMutationResult = Apollo.MutationResult<UpdateBlogMutation>;
export type UpdateBlogMutationOptions = Apollo.BaseMutationOptions<UpdateBlogMutation, UpdateBlogMutationVariables>;
export const UpdateBroadcastDocument = gql`
    mutation UpdateBroadcast($updateBroadcastId: ID!, $data: BroadcastInput!) {
        updateBroadcast(id: $updateBroadcastId, data: $data) {
            data {
                id
                attributes {
                    title
                }
            }
        }
    }
`;
export type UpdateBroadcastMutationFn = Apollo.MutationFunction<
    UpdateBroadcastMutation,
    UpdateBroadcastMutationVariables
>;

/**
 * __useUpdateBroadcastMutation__
 *
 * To run a mutation, you first call `useUpdateBroadcastMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBroadcastMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBroadcastMutation, { data, loading, error }] = useUpdateBroadcastMutation({
 *   variables: {
 *      updateBroadcastId: // value for 'updateBroadcastId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBroadcastMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateBroadcastMutation, UpdateBroadcastMutationVariables>,
) {
    return Apollo.useMutation<UpdateBroadcastMutation, UpdateBroadcastMutationVariables>(
        UpdateBroadcastDocument,
        baseOptions,
    );
}
export type UpdateBroadcastMutationHookResult = ReturnType<typeof useUpdateBroadcastMutation>;
export type UpdateBroadcastMutationResult = Apollo.MutationResult<UpdateBroadcastMutation>;
export type UpdateBroadcastMutationOptions = Apollo.BaseMutationOptions<
    UpdateBroadcastMutation,
    UpdateBroadcastMutationVariables
>;
export const UpdateBroadcastSerieDocument = gql`
    mutation UpdateBroadcastSerie($updateBroadcastSerieId: ID!, $data: BroadcastSerieInput!) {
        updateBroadcastSerie(id: $updateBroadcastSerieId, data: $data) {
            data {
                id
                attributes {
                    title
                }
            }
        }
    }
`;
export type UpdateBroadcastSerieMutationFn = Apollo.MutationFunction<
    UpdateBroadcastSerieMutation,
    UpdateBroadcastSerieMutationVariables
>;

/**
 * __useUpdateBroadcastSerieMutation__
 *
 * To run a mutation, you first call `useUpdateBroadcastSerieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBroadcastSerieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBroadcastSerieMutation, { data, loading, error }] = useUpdateBroadcastSerieMutation({
 *   variables: {
 *      updateBroadcastSerieId: // value for 'updateBroadcastSerieId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBroadcastSerieMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateBroadcastSerieMutation, UpdateBroadcastSerieMutationVariables>,
) {
    return Apollo.useMutation<UpdateBroadcastSerieMutation, UpdateBroadcastSerieMutationVariables>(
        UpdateBroadcastSerieDocument,
        baseOptions,
    );
}
export type UpdateBroadcastSerieMutationHookResult = ReturnType<typeof useUpdateBroadcastSerieMutation>;
export type UpdateBroadcastSerieMutationResult = Apollo.MutationResult<UpdateBroadcastSerieMutation>;
export type UpdateBroadcastSerieMutationOptions = Apollo.BaseMutationOptions<
    UpdateBroadcastSerieMutation,
    UpdateBroadcastSerieMutationVariables
>;
export const UpdateCallbackDocument = gql`
    mutation UpdateCallback($updateCallbackId: ID!, $data: CallbackInput!) {
        updateCallback(id: $updateCallbackId, data: $data) {
            data {
                id
                attributes {
                    phoneNumber
                    isCalled
                }
            }
        }
    }
`;
export type UpdateCallbackMutationFn = Apollo.MutationFunction<UpdateCallbackMutation, UpdateCallbackMutationVariables>;

/**
 * __useUpdateCallbackMutation__
 *
 * To run a mutation, you first call `useUpdateCallbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCallbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCallbackMutation, { data, loading, error }] = useUpdateCallbackMutation({
 *   variables: {
 *      updateCallbackId: // value for 'updateCallbackId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCallbackMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateCallbackMutation, UpdateCallbackMutationVariables>,
) {
    return Apollo.useMutation<UpdateCallbackMutation, UpdateCallbackMutationVariables>(
        UpdateCallbackDocument,
        baseOptions,
    );
}
export type UpdateCallbackMutationHookResult = ReturnType<typeof useUpdateCallbackMutation>;
export type UpdateCallbackMutationResult = Apollo.MutationResult<UpdateCallbackMutation>;
export type UpdateCallbackMutationOptions = Apollo.BaseMutationOptions<
    UpdateCallbackMutation,
    UpdateCallbackMutationVariables
>;
export const UpdateCourseRegisterDocument = gql`
    mutation UpdateCourseRegister($updateCourseRegisterId: ID!, $data: CourseRegisterInput!) {
        updateCourseRegister(id: $updateCourseRegisterId, data: $data) {
            data {
                id
            }
        }
    }
`;
export type UpdateCourseRegisterMutationFn = Apollo.MutationFunction<
    UpdateCourseRegisterMutation,
    UpdateCourseRegisterMutationVariables
>;

/**
 * __useUpdateCourseRegisterMutation__
 *
 * To run a mutation, you first call `useUpdateCourseRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseRegisterMutation, { data, loading, error }] = useUpdateCourseRegisterMutation({
 *   variables: {
 *      updateCourseRegisterId: // value for 'updateCourseRegisterId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCourseRegisterMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateCourseRegisterMutation, UpdateCourseRegisterMutationVariables>,
) {
    return Apollo.useMutation<UpdateCourseRegisterMutation, UpdateCourseRegisterMutationVariables>(
        UpdateCourseRegisterDocument,
        baseOptions,
    );
}
export type UpdateCourseRegisterMutationHookResult = ReturnType<typeof useUpdateCourseRegisterMutation>;
export type UpdateCourseRegisterMutationResult = Apollo.MutationResult<UpdateCourseRegisterMutation>;
export type UpdateCourseRegisterMutationOptions = Apollo.BaseMutationOptions<
    UpdateCourseRegisterMutation,
    UpdateCourseRegisterMutationVariables
>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($updateCourseId: ID!, $data: CourseInput!) {
        updateCourse(id: $updateCourseId, data: $data) {
            data {
                id
                attributes {
                    name
                }
            }
        }
    }
`;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      updateCourseId: // value for 'updateCourseId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCourseMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>,
) {
    return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, baseOptions);
}
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<
    UpdateCourseMutation,
    UpdateCourseMutationVariables
>;
export const UpdateEmployeeDocument = gql`
    mutation UpdateEmployee($updateEmployeeId: ID!, $data: EmployeeInput!) {
        updateEmployee(id: $updateEmployeeId, data: $data) {
            data {
                id
            }
        }
    }
`;
export type UpdateEmployeeMutationFn = Apollo.MutationFunction<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>;

/**
 * __useUpdateEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployeeMutation, { data, loading, error }] = useUpdateEmployeeMutation({
 *   variables: {
 *      updateEmployeeId: // value for 'updateEmployeeId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>,
) {
    return Apollo.useMutation<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>(
        UpdateEmployeeDocument,
        baseOptions,
    );
}
export type UpdateEmployeeMutationHookResult = ReturnType<typeof useUpdateEmployeeMutation>;
export type UpdateEmployeeMutationResult = Apollo.MutationResult<UpdateEmployeeMutation>;
export type UpdateEmployeeMutationOptions = Apollo.BaseMutationOptions<
    UpdateEmployeeMutation,
    UpdateEmployeeMutationVariables
>;
export const UpdateGroupDocument = gql`
    mutation UpdateGroup($updateGroupId: ID!, $data: GroupInput!) {
        updateGroup(id: $updateGroupId, data: $data) {
            data {
                id
                attributes {
                    name
                }
            }
        }
    }
`;
export type UpdateGroupMutationFn = Apollo.MutationFunction<UpdateGroupMutation, UpdateGroupMutationVariables>;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      updateGroupId: // value for 'updateGroupId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateGroupMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateGroupMutation, UpdateGroupMutationVariables>,
) {
    return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, baseOptions);
}
export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const UpdateMessageDocument = gql`
    mutation UpdateMessage($updateMessageId: ID!, $data: MessageInput!) {
        updateMessage(id: $updateMessageId, data: $data) {
            data {
                id
                attributes {
                    isRead
                    message
                    fullName
                }
            }
        }
    }
`;
export type UpdateMessageMutationFn = Apollo.MutationFunction<UpdateMessageMutation, UpdateMessageMutationVariables>;

/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      updateMessageId: // value for 'updateMessageId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMessageMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateMessageMutation, UpdateMessageMutationVariables>,
) {
    return Apollo.useMutation<UpdateMessageMutation, UpdateMessageMutationVariables>(
        UpdateMessageDocument,
        baseOptions,
    );
}
export type UpdateMessageMutationHookResult = ReturnType<typeof useUpdateMessageMutation>;
export type UpdateMessageMutationResult = Apollo.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<
    UpdateMessageMutation,
    UpdateMessageMutationVariables
>;
export const UpdateUsersPermissionsUserDocument = gql`
    mutation UpdateUsersPermissionsUser($updateUsersPermissionsUserId: ID!, $data: UsersPermissionsUserInput!) {
        updateUsersPermissionsUser(id: $updateUsersPermissionsUserId, data: $data) {
            data {
                id
                attributes {
                    firstName
                }
            }
        }
    }
`;
export type UpdateUsersPermissionsUserMutationFn = Apollo.MutationFunction<
    UpdateUsersPermissionsUserMutation,
    UpdateUsersPermissionsUserMutationVariables
>;

/**
 * __useUpdateUsersPermissionsUserMutation__
 *
 * To run a mutation, you first call `useUpdateUsersPermissionsUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsersPermissionsUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsersPermissionsUserMutation, { data, loading, error }] = useUpdateUsersPermissionsUserMutation({
 *   variables: {
 *      updateUsersPermissionsUserId: // value for 'updateUsersPermissionsUserId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUsersPermissionsUserMutation(
    baseOptions?: Apollo.MutationHookOptions<
        UpdateUsersPermissionsUserMutation,
        UpdateUsersPermissionsUserMutationVariables
    >,
) {
    return Apollo.useMutation<UpdateUsersPermissionsUserMutation, UpdateUsersPermissionsUserMutationVariables>(
        UpdateUsersPermissionsUserDocument,
        baseOptions,
    );
}
export type UpdateUsersPermissionsUserMutationHookResult = ReturnType<typeof useUpdateUsersPermissionsUserMutation>;
export type UpdateUsersPermissionsUserMutationResult = Apollo.MutationResult<UpdateUsersPermissionsUserMutation>;
export type UpdateUsersPermissionsUserMutationOptions = Apollo.BaseMutationOptions<
    UpdateUsersPermissionsUserMutation,
    UpdateUsersPermissionsUserMutationVariables
>;
export const UpdateSliderShowDocument = gql`
    mutation UpdateSliderShow($updateSliderShowId: ID!, $data: SliderShowInput!) {
        updateSliderShow(id: $updateSliderShowId, data: $data) {
            data {
                id
            }
        }
    }
`;
export type UpdateSliderShowMutationFn = Apollo.MutationFunction<
    UpdateSliderShowMutation,
    UpdateSliderShowMutationVariables
>;

/**
 * __useUpdateSliderShowMutation__
 *
 * To run a mutation, you first call `useUpdateSliderShowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSliderShowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSliderShowMutation, { data, loading, error }] = useUpdateSliderShowMutation({
 *   variables: {
 *      updateSliderShowId: // value for 'updateSliderShowId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSliderShowMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateSliderShowMutation, UpdateSliderShowMutationVariables>,
) {
    return Apollo.useMutation<UpdateSliderShowMutation, UpdateSliderShowMutationVariables>(
        UpdateSliderShowDocument,
        baseOptions,
    );
}
export type UpdateSliderShowMutationHookResult = ReturnType<typeof useUpdateSliderShowMutation>;
export type UpdateSliderShowMutationResult = Apollo.MutationResult<UpdateSliderShowMutation>;
export type UpdateSliderShowMutationOptions = Apollo.BaseMutationOptions<
    UpdateSliderShowMutation,
    UpdateSliderShowMutationVariables
>;
export const UpdateTrainerDocument = gql`
    mutation UpdateTrainer($updateTrainerId: ID!, $data: TrainerInput!) {
        updateTrainer(id: $updateTrainerId, data: $data) {
            data {
                id
                attributes {
                    trainerTitle
                    fullName
                }
            }
        }
    }
`;
export type UpdateTrainerMutationFn = Apollo.MutationFunction<UpdateTrainerMutation, UpdateTrainerMutationVariables>;

/**
 * __useUpdateTrainerMutation__
 *
 * To run a mutation, you first call `useUpdateTrainerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTrainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTrainerMutation, { data, loading, error }] = useUpdateTrainerMutation({
 *   variables: {
 *      updateTrainerId: // value for 'updateTrainerId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTrainerMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateTrainerMutation, UpdateTrainerMutationVariables>,
) {
    return Apollo.useMutation<UpdateTrainerMutation, UpdateTrainerMutationVariables>(
        UpdateTrainerDocument,
        baseOptions,
    );
}
export type UpdateTrainerMutationHookResult = ReturnType<typeof useUpdateTrainerMutation>;
export type UpdateTrainerMutationResult = Apollo.MutationResult<UpdateTrainerMutation>;
export type UpdateTrainerMutationOptions = Apollo.BaseMutationOptions<
    UpdateTrainerMutation,
    UpdateTrainerMutationVariables
>;
export const UpdateVideoDocument = gql`
    mutation UpdateVideo($updateVideoId: ID!, $data: VideoInput!) {
        updateVideo(id: $updateVideoId, data: $data) {
            data {
                id
                attributes {
                    title
                }
            }
        }
    }
`;
export type UpdateVideoMutationFn = Apollo.MutationFunction<UpdateVideoMutation, UpdateVideoMutationVariables>;

/**
 * __useUpdateVideoMutation__
 *
 * To run a mutation, you first call `useUpdateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideoMutation, { data, loading, error }] = useUpdateVideoMutation({
 *   variables: {
 *      updateVideoId: // value for 'updateVideoId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateVideoMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateVideoMutation, UpdateVideoMutationVariables>,
) {
    return Apollo.useMutation<UpdateVideoMutation, UpdateVideoMutationVariables>(UpdateVideoDocument, baseOptions);
}
export type UpdateVideoMutationHookResult = ReturnType<typeof useUpdateVideoMutation>;
export type UpdateVideoMutationResult = Apollo.MutationResult<UpdateVideoMutation>;
export type UpdateVideoMutationOptions = Apollo.BaseMutationOptions<UpdateVideoMutation, UpdateVideoMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: UsersPermissionsRegisterInput!) {
        register(input: $input) {
            jwt
            user {
                id
                username
            }
        }
    }
`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
    baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
    return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($password: String!, $passwordConfirmation: String!, $code: String!) {
        resetPassword(password: $password, passwordConfirmation: $passwordConfirmation, code: $code) {
            jwt
        }
    }
`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      passwordConfirmation: // value for 'passwordConfirmation'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useResetPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>,
) {
    return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
        ResetPasswordDocument,
        baseOptions,
    );
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
>;
export const BlogDocument = gql`
    query Blog($filters: BlogFiltersInput) {
        blogs(filters: $filters) {
            data {
                id
                attributes {
                    title
                    body
                    coverImage {
                        data {
                            attributes {
                                name
                                url
                            }
                            id
                        }
                    }
                    category
                    createdAt
                    status
                }
            }
        }
    }
`;

/**
 * __useBlogQuery__
 *
 * To run a query within a React component, call `useBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useBlogQuery(baseOptions?: Apollo.QueryHookOptions<BlogQuery, BlogQueryVariables>) {
    return Apollo.useQuery<BlogQuery, BlogQueryVariables>(BlogDocument, baseOptions);
}
export function useBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogQuery, BlogQueryVariables>) {
    return Apollo.useLazyQuery<BlogQuery, BlogQueryVariables>(BlogDocument, baseOptions);
}
export type BlogQueryHookResult = ReturnType<typeof useBlogQuery>;
export type BlogLazyQueryHookResult = ReturnType<typeof useBlogLazyQuery>;
export type BlogQueryResult = Apollo.QueryResult<BlogQuery, BlogQueryVariables>;
export const BlogsDocument = gql`
    query Blogs($pagination: PaginationArg, $sort: [String], $filters: BlogFiltersInput) {
        blogs(pagination: $pagination, sort: $sort, filters: $filters) {
            data {
                id
                attributes {
                    title
                    coverImage {
                        data {
                            id
                            attributes {
                                url
                                name
                            }
                        }
                    }
                    slug
                    category
                    createdAt
                    body
                    status
                }
            }
            meta {
                pagination {
                    total
                    page
                    pageSize
                    pageCount
                }
            }
        }
    }
`;

/**
 * __useBlogsQuery__
 *
 * To run a query within a React component, call `useBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useBlogsQuery(baseOptions?: Apollo.QueryHookOptions<BlogsQuery, BlogsQueryVariables>) {
    return Apollo.useQuery<BlogsQuery, BlogsQueryVariables>(BlogsDocument, baseOptions);
}
export function useBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogsQuery, BlogsQueryVariables>) {
    return Apollo.useLazyQuery<BlogsQuery, BlogsQueryVariables>(BlogsDocument, baseOptions);
}
export type BlogsQueryHookResult = ReturnType<typeof useBlogsQuery>;
export type BlogsLazyQueryHookResult = ReturnType<typeof useBlogsLazyQuery>;
export type BlogsQueryResult = Apollo.QueryResult<BlogsQuery, BlogsQueryVariables>;
export const BroadcastSeriesDocument = gql`
    query BroadcastSeries(
        $pagination: PaginationArg
        $sort: [String]
        $broadcastSeriesPagination2: PaginationArg
        $filters: BroadcastSerieFiltersInput
    ) {
        broadcastSeries(sort: $sort, pagination: $broadcastSeriesPagination2, filters: $filters) {
            data {
                id
                attributes {
                    title
                    broadcasts(pagination: $pagination) {
                        data {
                            id
                            attributes {
                                title
                                coverImage {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                                category
                                slug
                                createdAt
                                status
                            }
                        }
                    }
                    slug
                    totalMinutes
                    coverImage {
                        data {
                            id
                            attributes {
                                url
                            }
                        }
                    }
                    status
                    createdAt
                }
            }
            meta {
                pagination {
                    pageCount
                    page
                    pageSize
                    total
                }
            }
        }
    }
`;

/**
 * __useBroadcastSeriesQuery__
 *
 * To run a query within a React component, call `useBroadcastSeriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBroadcastSeriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBroadcastSeriesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *      broadcastSeriesPagination2: // value for 'broadcastSeriesPagination2'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useBroadcastSeriesQuery(
    baseOptions?: Apollo.QueryHookOptions<BroadcastSeriesQuery, BroadcastSeriesQueryVariables>,
) {
    return Apollo.useQuery<BroadcastSeriesQuery, BroadcastSeriesQueryVariables>(BroadcastSeriesDocument, baseOptions);
}
export function useBroadcastSeriesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<BroadcastSeriesQuery, BroadcastSeriesQueryVariables>,
) {
    return Apollo.useLazyQuery<BroadcastSeriesQuery, BroadcastSeriesQueryVariables>(
        BroadcastSeriesDocument,
        baseOptions,
    );
}
export type BroadcastSeriesQueryHookResult = ReturnType<typeof useBroadcastSeriesQuery>;
export type BroadcastSeriesLazyQueryHookResult = ReturnType<typeof useBroadcastSeriesLazyQuery>;
export type BroadcastSeriesQueryResult = Apollo.QueryResult<BroadcastSeriesQuery, BroadcastSeriesQueryVariables>;
export const BroadcastDocument = gql`
    query Broadcast($filters: BroadcastFiltersInput) {
        broadcasts(filters: $filters) {
            data {
                id
                attributes {
                    title
                    coverImage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    category
                    slug
                    videoId
                    broadcast_sery {
                        data {
                            attributes {
                                slug
                            }
                        }
                    }
                    createdAt
                }
            }
        }
    }
`;

/**
 * __useBroadcastQuery__
 *
 * To run a query within a React component, call `useBroadcastQuery` and pass it any options that fit your needs.
 * When your component renders, `useBroadcastQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBroadcastQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useBroadcastQuery(baseOptions?: Apollo.QueryHookOptions<BroadcastQuery, BroadcastQueryVariables>) {
    return Apollo.useQuery<BroadcastQuery, BroadcastQueryVariables>(BroadcastDocument, baseOptions);
}
export function useBroadcastLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<BroadcastQuery, BroadcastQueryVariables>,
) {
    return Apollo.useLazyQuery<BroadcastQuery, BroadcastQueryVariables>(BroadcastDocument, baseOptions);
}
export type BroadcastQueryHookResult = ReturnType<typeof useBroadcastQuery>;
export type BroadcastLazyQueryHookResult = ReturnType<typeof useBroadcastLazyQuery>;
export type BroadcastQueryResult = Apollo.QueryResult<BroadcastQuery, BroadcastQueryVariables>;
export const BroadcastsDocument = gql`
    query Broadcasts($filters: BroadcastFiltersInput, $pagination: PaginationArg, $sort: [String]) {
        broadcasts(filters: $filters, pagination: $pagination, sort: $sort) {
            data {
                id
                attributes {
                    title
                    coverImage {
                        data {
                            attributes {
                                url
                                name
                            }
                        }
                    }
                    category
                    createdAt
                    slug
                    status
                    broadcast_sery {
                        data {
                            attributes {
                                slug
                                title
                                coverImage {
                                    data {
                                        id
                                        attributes {
                                            name
                                            url
                                        }
                                    }
                                }
                            }
                            id
                        }
                    }
                }
            }
            meta {
                pagination {
                    page
                    pageCount
                    pageSize
                    total
                }
            }
        }
    }
`;

/**
 * __useBroadcastsQuery__
 *
 * To run a query within a React component, call `useBroadcastsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBroadcastsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBroadcastsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useBroadcastsQuery(baseOptions?: Apollo.QueryHookOptions<BroadcastsQuery, BroadcastsQueryVariables>) {
    return Apollo.useQuery<BroadcastsQuery, BroadcastsQueryVariables>(BroadcastsDocument, baseOptions);
}
export function useBroadcastsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<BroadcastsQuery, BroadcastsQueryVariables>,
) {
    return Apollo.useLazyQuery<BroadcastsQuery, BroadcastsQueryVariables>(BroadcastsDocument, baseOptions);
}
export type BroadcastsQueryHookResult = ReturnType<typeof useBroadcastsQuery>;
export type BroadcastsLazyQueryHookResult = ReturnType<typeof useBroadcastsLazyQuery>;
export type BroadcastsQueryResult = Apollo.QueryResult<BroadcastsQuery, BroadcastsQueryVariables>;
export const CourseDetailDocument = gql`
    query CourseDetail($courseId: ID) {
        course(id: $courseId) {
            data {
                id
                attributes {
                    isActive
                    name
                    price
                    category
                    capacity
                    groups {
                        data {
                            id
                            attributes {
                                name
                                isActive
                            }
                        }
                    }
                    description
                    availableProficiencies
                    benefits
                    syllabus
                    duration
                    durationType
                    count
                    trainers {
                        data {
                            attributes {
                                trainerTitle
                                fullName
                                image {
                                    data {
                                        id
                                        attributes {
                                            name
                                            url
                                        }
                                    }
                                }
                                firstName
                                lastName
                                profileImage {
                                    data {
                                        id
                                        attributes {
                                            name
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                    courseImage {
                        data {
                            id
                            attributes {
                                name
                                url
                            }
                        }
                    }
                    includedPayment
                    videoId
                }
            }
        }
    }
`;

/**
 * __useCourseDetailQuery__
 *
 * To run a query within a React component, call `useCourseDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseDetailQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useCourseDetailQuery(
    baseOptions?: Apollo.QueryHookOptions<CourseDetailQuery, CourseDetailQueryVariables>,
) {
    return Apollo.useQuery<CourseDetailQuery, CourseDetailQueryVariables>(CourseDetailDocument, baseOptions);
}
export function useCourseDetailLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<CourseDetailQuery, CourseDetailQueryVariables>,
) {
    return Apollo.useLazyQuery<CourseDetailQuery, CourseDetailQueryVariables>(CourseDetailDocument, baseOptions);
}
export type CourseDetailQueryHookResult = ReturnType<typeof useCourseDetailQuery>;
export type CourseDetailLazyQueryHookResult = ReturnType<typeof useCourseDetailLazyQuery>;
export type CourseDetailQueryResult = Apollo.QueryResult<CourseDetailQuery, CourseDetailQueryVariables>;
export const CourseDocument = gql`
    query Course($courseId: ID) {
        course(id: $courseId) {
            data {
                id
                attributes {
                    availableProficiencies
                    videoId
                    benefits
                    includedPayment
                    capacity
                    category
                    count
                    courseImage {
                        data {
                            id
                            attributes {
                                size
                                name
                                url
                            }
                        }
                    }
                    description
                    durationType
                    groups {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                    isActive
                    name
                    price
                    status
                    syllabus
                    trainers {
                        data {
                            id
                            attributes {
                                firstName
                                lastName
                            }
                        }
                    }
                    duration
                }
            }
        }
    }
`;

/**
 * __useCourseQuery__
 *
 * To run a query within a React component, call `useCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useCourseQuery(baseOptions?: Apollo.QueryHookOptions<CourseQuery, CourseQueryVariables>) {
    return Apollo.useQuery<CourseQuery, CourseQueryVariables>(CourseDocument, baseOptions);
}
export function useCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseQuery, CourseQueryVariables>) {
    return Apollo.useLazyQuery<CourseQuery, CourseQueryVariables>(CourseDocument, baseOptions);
}
export type CourseQueryHookResult = ReturnType<typeof useCourseQuery>;
export type CourseLazyQueryHookResult = ReturnType<typeof useCourseLazyQuery>;
export type CourseQueryResult = Apollo.QueryResult<CourseQuery, CourseQueryVariables>;
export const BlogByAdminDocument = gql`
    query BlogByAdmin($blogId: ID) {
        blog(id: $blogId) {
            data {
                id
                attributes {
                    body
                    category
                    coverImage {
                        data {
                            id
                            attributes {
                                name
                                url
                            }
                        }
                    }
                    createdAt
                    slug
                    status
                    title
                    updatedAt
                }
            }
        }
    }
`;

/**
 * __useBlogByAdminQuery__
 *
 * To run a query within a React component, call `useBlogByAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogByAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogByAdminQuery({
 *   variables: {
 *      blogId: // value for 'blogId'
 *   },
 * });
 */
export function useBlogByAdminQuery(
    baseOptions?: Apollo.QueryHookOptions<BlogByAdminQuery, BlogByAdminQueryVariables>,
) {
    return Apollo.useQuery<BlogByAdminQuery, BlogByAdminQueryVariables>(BlogByAdminDocument, baseOptions);
}
export function useBlogByAdminLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<BlogByAdminQuery, BlogByAdminQueryVariables>,
) {
    return Apollo.useLazyQuery<BlogByAdminQuery, BlogByAdminQueryVariables>(BlogByAdminDocument, baseOptions);
}
export type BlogByAdminQueryHookResult = ReturnType<typeof useBlogByAdminQuery>;
export type BlogByAdminLazyQueryHookResult = ReturnType<typeof useBlogByAdminLazyQuery>;
export type BlogByAdminQueryResult = Apollo.QueryResult<BlogByAdminQuery, BlogByAdminQueryVariables>;
export const BroadcastByAdminDocument = gql`
    query BroadcastByAdmin($broadcastId: ID) {
        broadcast(id: $broadcastId) {
            data {
                id
                attributes {
                    title
                    status
                    slug
                    createdAt
                    coverImage {
                        data {
                            id
                            attributes {
                                name
                                url
                            }
                        }
                    }
                    videoId
                    broadcast_sery {
                        data {
                            id
                            attributes {
                                title
                                coverImage {
                                    data {
                                        id
                                        attributes {
                                            url
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * __useBroadcastByAdminQuery__
 *
 * To run a query within a React component, call `useBroadcastByAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useBroadcastByAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBroadcastByAdminQuery({
 *   variables: {
 *      broadcastId: // value for 'broadcastId'
 *   },
 * });
 */
export function useBroadcastByAdminQuery(
    baseOptions?: Apollo.QueryHookOptions<BroadcastByAdminQuery, BroadcastByAdminQueryVariables>,
) {
    return Apollo.useQuery<BroadcastByAdminQuery, BroadcastByAdminQueryVariables>(
        BroadcastByAdminDocument,
        baseOptions,
    );
}
export function useBroadcastByAdminLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<BroadcastByAdminQuery, BroadcastByAdminQueryVariables>,
) {
    return Apollo.useLazyQuery<BroadcastByAdminQuery, BroadcastByAdminQueryVariables>(
        BroadcastByAdminDocument,
        baseOptions,
    );
}
export type BroadcastByAdminQueryHookResult = ReturnType<typeof useBroadcastByAdminQuery>;
export type BroadcastByAdminLazyQueryHookResult = ReturnType<typeof useBroadcastByAdminLazyQuery>;
export type BroadcastByAdminQueryResult = Apollo.QueryResult<BroadcastByAdminQuery, BroadcastByAdminQueryVariables>;
export const BroadcastSerieByAdminDocument = gql`
    query BroadcastSerieByAdmin($broadcastSerieId: ID) {
        broadcastSerie(id: $broadcastSerieId) {
            data {
                id
                attributes {
                    title
                    status
                    slug
                    createdAt
                    coverImage {
                        data {
                            id
                            attributes {
                                name
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * __useBroadcastSerieByAdminQuery__
 *
 * To run a query within a React component, call `useBroadcastSerieByAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useBroadcastSerieByAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBroadcastSerieByAdminQuery({
 *   variables: {
 *      broadcastSerieId: // value for 'broadcastSerieId'
 *   },
 * });
 */
export function useBroadcastSerieByAdminQuery(
    baseOptions?: Apollo.QueryHookOptions<BroadcastSerieByAdminQuery, BroadcastSerieByAdminQueryVariables>,
) {
    return Apollo.useQuery<BroadcastSerieByAdminQuery, BroadcastSerieByAdminQueryVariables>(
        BroadcastSerieByAdminDocument,
        baseOptions,
    );
}
export function useBroadcastSerieByAdminLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<BroadcastSerieByAdminQuery, BroadcastSerieByAdminQueryVariables>,
) {
    return Apollo.useLazyQuery<BroadcastSerieByAdminQuery, BroadcastSerieByAdminQueryVariables>(
        BroadcastSerieByAdminDocument,
        baseOptions,
    );
}
export type BroadcastSerieByAdminQueryHookResult = ReturnType<typeof useBroadcastSerieByAdminQuery>;
export type BroadcastSerieByAdminLazyQueryHookResult = ReturnType<typeof useBroadcastSerieByAdminLazyQuery>;
export type BroadcastSerieByAdminQueryResult = Apollo.QueryResult<
    BroadcastSerieByAdminQuery,
    BroadcastSerieByAdminQueryVariables
>;
export const CallbacksDocument = gql`
    query Callbacks($sort: [String], $pagination: PaginationArg, $filters: CallbackFiltersInput) {
        callbacks(sort: $sort, pagination: $pagination, filters: $filters) {
            data {
                id
                attributes {
                    phoneNumber
                    createdAt
                    isCalled
                }
            }
            meta {
                pagination {
                    total
                    pageSize
                    pageCount
                    page
                }
            }
        }
    }
`;

/**
 * __useCallbacksQuery__
 *
 * To run a query within a React component, call `useCallbacksQuery` and pass it any options that fit your needs.
 * When your component renders, `useCallbacksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCallbacksQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useCallbacksQuery(baseOptions?: Apollo.QueryHookOptions<CallbacksQuery, CallbacksQueryVariables>) {
    return Apollo.useQuery<CallbacksQuery, CallbacksQueryVariables>(CallbacksDocument, baseOptions);
}
export function useCallbacksLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<CallbacksQuery, CallbacksQueryVariables>,
) {
    return Apollo.useLazyQuery<CallbacksQuery, CallbacksQueryVariables>(CallbacksDocument, baseOptions);
}
export type CallbacksQueryHookResult = ReturnType<typeof useCallbacksQuery>;
export type CallbacksLazyQueryHookResult = ReturnType<typeof useCallbacksLazyQuery>;
export type CallbacksQueryResult = Apollo.QueryResult<CallbacksQuery, CallbacksQueryVariables>;
export const CourseRegisterDocument = gql`
    query CourseRegister($courseRegisterId: ID) {
        courseRegister(id: $courseRegisterId) {
            data {
                id
                attributes {
                    paymentStatus
                    status
                    user {
                        data {
                            id
                            attributes {
                                firstName
                                lastName
                            }
                        }
                    }
                    group {
                        data {
                            id
                            attributes {
                                name
                                startsAt
                                endsAt
                                course {
                                    data {
                                        attributes {
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * __useCourseRegisterQuery__
 *
 * To run a query within a React component, call `useCourseRegisterQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseRegisterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseRegisterQuery({
 *   variables: {
 *      courseRegisterId: // value for 'courseRegisterId'
 *   },
 * });
 */
export function useCourseRegisterQuery(
    baseOptions?: Apollo.QueryHookOptions<CourseRegisterQuery, CourseRegisterQueryVariables>,
) {
    return Apollo.useQuery<CourseRegisterQuery, CourseRegisterQueryVariables>(CourseRegisterDocument, baseOptions);
}
export function useCourseRegisterLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<CourseRegisterQuery, CourseRegisterQueryVariables>,
) {
    return Apollo.useLazyQuery<CourseRegisterQuery, CourseRegisterQueryVariables>(CourseRegisterDocument, baseOptions);
}
export type CourseRegisterQueryHookResult = ReturnType<typeof useCourseRegisterQuery>;
export type CourseRegisterLazyQueryHookResult = ReturnType<typeof useCourseRegisterLazyQuery>;
export type CourseRegisterQueryResult = Apollo.QueryResult<CourseRegisterQuery, CourseRegisterQueryVariables>;
export const CourseRegistersDocument = gql`
    query CourseRegisters($sort: [String], $pagination: PaginationArg, $filters: CourseRegisterFiltersInput) {
        courseRegisters(sort: $sort, pagination: $pagination, filters: $filters) {
            data {
                id
                attributes {
                    paymentStatus
                    status
                    user {
                        data {
                            attributes {
                                firstName
                                lastName
                            }
                        }
                    }
                    group {
                        data {
                            attributes {
                                name
                                startsAt
                                endsAt
                                course {
                                    data {
                                        attributes {
                                            name
                                            price
                                            duration
                                            durationType
                                            capacity
                                            count
                                            trainers {
                                                data {
                                                    id
                                                    attributes {
                                                        fullName
                                                        position
                                                        profileImage {
                                                            data {
                                                                attributes {
                                                                    url
                                                                    name
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            meta {
                pagination {
                    total
                    pageSize
                    pageCount
                    page
                }
            }
        }
    }
`;

/**
 * __useCourseRegistersQuery__
 *
 * To run a query within a React component, call `useCourseRegistersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseRegistersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseRegistersQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useCourseRegistersQuery(
    baseOptions?: Apollo.QueryHookOptions<CourseRegistersQuery, CourseRegistersQueryVariables>,
) {
    return Apollo.useQuery<CourseRegistersQuery, CourseRegistersQueryVariables>(CourseRegistersDocument, baseOptions);
}
export function useCourseRegistersLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<CourseRegistersQuery, CourseRegistersQueryVariables>,
) {
    return Apollo.useLazyQuery<CourseRegistersQuery, CourseRegistersQueryVariables>(
        CourseRegistersDocument,
        baseOptions,
    );
}
export type CourseRegistersQueryHookResult = ReturnType<typeof useCourseRegistersQuery>;
export type CourseRegistersLazyQueryHookResult = ReturnType<typeof useCourseRegistersLazyQuery>;
export type CourseRegistersQueryResult = Apollo.QueryResult<CourseRegistersQuery, CourseRegistersQueryVariables>;
export const CoursesDocument = gql`
    query Courses($filters: CourseFiltersInput, $pagination: PaginationArg, $sort: [String]) {
        courses(filters: $filters, pagination: $pagination, sort: $sort) {
            meta {
                pagination {
                    total
                    page
                    pageSize
                    pageCount
                }
            }
            data {
                id
                attributes {
                    isActive
                    name
                    category
                    price
                    capacity
                    groups {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                    description
                    availableProficiencies
                    benefits
                    syllabus
                    durationType
                    count
                    duration
                    status
                    createdAt
                    updatedAt
                    trainers {
                        data {
                            id
                            attributes {
                                firstName
                                lastName
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * __useCoursesQuery__
 *
 * To run a query within a React component, call `useCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useCoursesQuery(baseOptions?: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
    return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, baseOptions);
}
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
    return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, baseOptions);
}
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($deleteCourseId: ID!) {
        deleteCourse(id: $deleteCourseId) {
            data {
                id
            }
        }
    }
`;
export type DeleteCourseMutationFn = Apollo.MutationFunction<DeleteCourseMutation, DeleteCourseMutationVariables>;

/**
 * __useDeleteCourseMutation__
 *
 * To run a mutation, you first call `useDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseMutation, { data, loading, error }] = useDeleteCourseMutation({
 *   variables: {
 *      deleteCourseId: // value for 'deleteCourseId'
 *   },
 * });
 */
export function useDeleteCourseMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteCourseMutation, DeleteCourseMutationVariables>,
) {
    return Apollo.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument, baseOptions);
}
export type DeleteCourseMutationHookResult = ReturnType<typeof useDeleteCourseMutation>;
export type DeleteCourseMutationResult = Apollo.MutationResult<DeleteCourseMutation>;
export type DeleteCourseMutationOptions = Apollo.BaseMutationOptions<
    DeleteCourseMutation,
    DeleteCourseMutationVariables
>;
export const EmployeeDocument = gql`
    query Employee($employeeId: ID) {
        employee(id: $employeeId) {
            data {
                id
                attributes {
                    firstName
                    rank
                    image {
                        data {
                            id
                            attributes {
                                name
                                url
                            }
                        }
                    }
                    lastName
                    position
                    status
                }
            }
        }
    }
`;

/**
 * __useEmployeeQuery__
 *
 * To run a query within a React component, call `useEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployeeQuery({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useEmployeeQuery(baseOptions?: Apollo.QueryHookOptions<EmployeeQuery, EmployeeQueryVariables>) {
    return Apollo.useQuery<EmployeeQuery, EmployeeQueryVariables>(EmployeeDocument, baseOptions);
}
export function useEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmployeeQuery, EmployeeQueryVariables>) {
    return Apollo.useLazyQuery<EmployeeQuery, EmployeeQueryVariables>(EmployeeDocument, baseOptions);
}
export type EmployeeQueryHookResult = ReturnType<typeof useEmployeeQuery>;
export type EmployeeLazyQueryHookResult = ReturnType<typeof useEmployeeLazyQuery>;
export type EmployeeQueryResult = Apollo.QueryResult<EmployeeQuery, EmployeeQueryVariables>;
export const EmployeesDocument = gql`
    query Employees($filters: EmployeeFiltersInput, $pagination: PaginationArg, $sort: [String]) {
        employees(filters: $filters, pagination: $pagination, sort: $sort) {
            data {
                id
                attributes {
                    firstName
                    lastName
                    position
                    rank
                    status
                    updatedAt
                    image {
                        data {
                            id
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
            meta {
                pagination {
                    page
                    pageCount
                    pageSize
                    total
                }
            }
        }
    }
`;

/**
 * __useEmployeesQuery__
 *
 * To run a query within a React component, call `useEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployeesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<EmployeesQuery, EmployeesQueryVariables>) {
    return Apollo.useQuery<EmployeesQuery, EmployeesQueryVariables>(EmployeesDocument, baseOptions);
}
export function useEmployeesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<EmployeesQuery, EmployeesQueryVariables>,
) {
    return Apollo.useLazyQuery<EmployeesQuery, EmployeesQueryVariables>(EmployeesDocument, baseOptions);
}
export type EmployeesQueryHookResult = ReturnType<typeof useEmployeesQuery>;
export type EmployeesLazyQueryHookResult = ReturnType<typeof useEmployeesLazyQuery>;
export type EmployeesQueryResult = Apollo.QueryResult<EmployeesQuery, EmployeesQueryVariables>;
export const GroupDocument = gql`
    query Group($groupId: ID) {
        group(id: $groupId) {
            data {
                id
                attributes {
                    name
                    startsAt
                    endsAt
                    capacity
                    status
                    course {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupQuery(baseOptions?: Apollo.QueryHookOptions<GroupQuery, GroupQueryVariables>) {
    return Apollo.useQuery<GroupQuery, GroupQueryVariables>(GroupDocument, baseOptions);
}
export function useGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>) {
    return Apollo.useLazyQuery<GroupQuery, GroupQueryVariables>(GroupDocument, baseOptions);
}
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = Apollo.QueryResult<GroupQuery, GroupQueryVariables>;
export const GroupsDocument = gql`
    query Groups($sort: [String], $pagination: PaginationArg, $filters: GroupFiltersInput) {
        groups(sort: $sort, pagination: $pagination, filters: $filters) {
            data {
                id
                attributes {
                    name
                    startsAt
                    endsAt
                    isActive
                    course {
                        data {
                            id
                            attributes {
                                price
                                status
                                name
                            }
                        }
                    }
                    capacity
                    status
                    course_registers {
                        data {
                            id
                        }
                    }
                }
            }
            meta {
                pagination {
                    page
                    pageCount
                    pageSize
                    total
                }
            }
        }
    }
`;

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
    return Apollo.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, baseOptions);
}
export function useGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
    return Apollo.useLazyQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, baseOptions);
}
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>;
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>;
export type GroupsQueryResult = Apollo.QueryResult<GroupsQuery, GroupsQueryVariables>;
export const MessagesDocument = gql`
    query Messages($sort: [String], $pagination: PaginationArg, $filters: MessageFiltersInput) {
        messages(sort: $sort, pagination: $pagination, filters: $filters) {
            meta {
                pagination {
                    total
                    pageSize
                    pageCount
                    page
                }
            }
            data {
                id
                attributes {
                    fullName
                    email
                    createdAt
                    phoneNumber
                    message
                    interestedCourses {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                    type
                    isRead
                    interestedConsultings
                }
            }
        }
    }
`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
    return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
}
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
    return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
}
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const SliderShowDocument = gql`
    query SliderShow($sliderShowId: ID) {
        sliderShow(id: $sliderShowId) {
            data {
                id
                attributes {
                    content
                    title
                    coverImage {
                        data {
                            id
                            attributes {
                                url
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * __useSliderShowQuery__
 *
 * To run a query within a React component, call `useSliderShowQuery` and pass it any options that fit your needs.
 * When your component renders, `useSliderShowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSliderShowQuery({
 *   variables: {
 *      sliderShowId: // value for 'sliderShowId'
 *   },
 * });
 */
export function useSliderShowQuery(baseOptions?: Apollo.QueryHookOptions<SliderShowQuery, SliderShowQueryVariables>) {
    return Apollo.useQuery<SliderShowQuery, SliderShowQueryVariables>(SliderShowDocument, baseOptions);
}
export function useSliderShowLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SliderShowQuery, SliderShowQueryVariables>,
) {
    return Apollo.useLazyQuery<SliderShowQuery, SliderShowQueryVariables>(SliderShowDocument, baseOptions);
}
export type SliderShowQueryHookResult = ReturnType<typeof useSliderShowQuery>;
export type SliderShowLazyQueryHookResult = ReturnType<typeof useSliderShowLazyQuery>;
export type SliderShowQueryResult = Apollo.QueryResult<SliderShowQuery, SliderShowQueryVariables>;
export const SliderShowsDocument = gql`
    query SliderShows($sort: [String]) {
        sliderShows(sort: $sort) {
            data {
                id
                attributes {
                    title
                    coverImage {
                        data {
                            id
                            attributes {
                                name
                                url
                            }
                        }
                    }
                    content
                }
            }
        }
    }
`;

/**
 * __useSliderShowsQuery__
 *
 * To run a query within a React component, call `useSliderShowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSliderShowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSliderShowsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useSliderShowsQuery(
    baseOptions?: Apollo.QueryHookOptions<SliderShowsQuery, SliderShowsQueryVariables>,
) {
    return Apollo.useQuery<SliderShowsQuery, SliderShowsQueryVariables>(SliderShowsDocument, baseOptions);
}
export function useSliderShowsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SliderShowsQuery, SliderShowsQueryVariables>,
) {
    return Apollo.useLazyQuery<SliderShowsQuery, SliderShowsQueryVariables>(SliderShowsDocument, baseOptions);
}
export type SliderShowsQueryHookResult = ReturnType<typeof useSliderShowsQuery>;
export type SliderShowsLazyQueryHookResult = ReturnType<typeof useSliderShowsLazyQuery>;
export type SliderShowsQueryResult = Apollo.QueryResult<SliderShowsQuery, SliderShowsQueryVariables>;
export const SubscribersDocument = gql`
    query Subscribers($sort: [String], $pagination: PaginationArg, $filters: SubscriberFiltersInput) {
        subscribers(sort: $sort, pagination: $pagination, filters: $filters) {
            data {
                id
                attributes {
                    email
                    createdAt
                }
            }
            meta {
                pagination {
                    total
                    pageSize
                    page
                    pageCount
                }
            }
        }
    }
`;

/**
 * __useSubscribersQuery__
 *
 * To run a query within a React component, call `useSubscribersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscribersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribersQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useSubscribersQuery(
    baseOptions?: Apollo.QueryHookOptions<SubscribersQuery, SubscribersQueryVariables>,
) {
    return Apollo.useQuery<SubscribersQuery, SubscribersQueryVariables>(SubscribersDocument, baseOptions);
}
export function useSubscribersLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SubscribersQuery, SubscribersQueryVariables>,
) {
    return Apollo.useLazyQuery<SubscribersQuery, SubscribersQueryVariables>(SubscribersDocument, baseOptions);
}
export type SubscribersQueryHookResult = ReturnType<typeof useSubscribersQuery>;
export type SubscribersLazyQueryHookResult = ReturnType<typeof useSubscribersLazyQuery>;
export type SubscribersQueryResult = Apollo.QueryResult<SubscribersQuery, SubscribersQueryVariables>;
export const TrainerDocument = gql`
    query Trainer($trainerId: ID, $filters: CourseFiltersInput, $sort: [String], $pagination: PaginationArg) {
        trainer(id: $trainerId) {
            data {
                id
                attributes {
                    trainerTitle
                    courses(filters: $filters, sort: $sort, pagination: $pagination) {
                        data {
                            id
                            attributes {
                                name
                                category
                                description
                            }
                        }
                    }
                    fullName
                    email
                    phoneNumber
                    status
                    image {
                        data {
                            attributes {
                                name
                                size
                                url
                            }
                            id
                        }
                    }
                    gender
                    profileImage {
                        data {
                            id
                            attributes {
                                size
                                url
                                name
                            }
                        }
                    }
                    logoImage {
                        data {
                            id
                            attributes {
                                size
                                url
                                name
                            }
                        }
                    }
                    firstName
                    lastName
                    link
                    company
                    position
                    body
                    name
                    surName
                    birthdayDate
                    updatedAt
                }
            }
        }
    }
`;

/**
 * __useTrainerQuery__
 *
 * To run a query within a React component, call `useTrainerQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrainerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrainerQuery({
 *   variables: {
 *      trainerId: // value for 'trainerId'
 *      filters: // value for 'filters'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useTrainerQuery(baseOptions?: Apollo.QueryHookOptions<TrainerQuery, TrainerQueryVariables>) {
    return Apollo.useQuery<TrainerQuery, TrainerQueryVariables>(TrainerDocument, baseOptions);
}
export function useTrainerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrainerQuery, TrainerQueryVariables>) {
    return Apollo.useLazyQuery<TrainerQuery, TrainerQueryVariables>(TrainerDocument, baseOptions);
}
export type TrainerQueryHookResult = ReturnType<typeof useTrainerQuery>;
export type TrainerLazyQueryHookResult = ReturnType<typeof useTrainerLazyQuery>;
export type TrainerQueryResult = Apollo.QueryResult<TrainerQuery, TrainerQueryVariables>;
export const TrainersDocument = gql`
    query Trainers($filters: TrainerFiltersInput, $pagination: PaginationArg, $sort: [String]) {
        trainers(filters: $filters, pagination: $pagination, sort: $sort) {
            data {
                id
                attributes {
                    trainerTitle
                    courses {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                    fullName
                    phoneNumber
                    firstName
                    lastName
                    email
                    birthdayDate
                    status
                    position
                    profileImage {
                        data {
                            attributes {
                                url
                            }
                            id
                        }
                    }
                    body
                }
            }
            meta {
                pagination {
                    total
                    page
                    pageSize
                    pageCount
                }
            }
        }
    }
`;

/**
 * __useTrainersQuery__
 *
 * To run a query within a React component, call `useTrainersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrainersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrainersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useTrainersQuery(baseOptions?: Apollo.QueryHookOptions<TrainersQuery, TrainersQueryVariables>) {
    return Apollo.useQuery<TrainersQuery, TrainersQueryVariables>(TrainersDocument, baseOptions);
}
export function useTrainersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrainersQuery, TrainersQueryVariables>) {
    return Apollo.useLazyQuery<TrainersQuery, TrainersQueryVariables>(TrainersDocument, baseOptions);
}
export type TrainersQueryHookResult = ReturnType<typeof useTrainersQuery>;
export type TrainersLazyQueryHookResult = ReturnType<typeof useTrainersLazyQuery>;
export type TrainersQueryResult = Apollo.QueryResult<TrainersQuery, TrainersQueryVariables>;
export const TransactionsDocument = gql`
    query Transactions($sort: [String], $pagination: PaginationArg, $filters: TransactionFiltersInput) {
        transactions(sort: $sort, pagination: $pagination, filters: $filters) {
            data {
                attributes {
                    user {
                        data {
                            attributes {
                                firstName
                                lastName
                            }
                        }
                    }
                    group {
                        data {
                            attributes {
                                name
                                course {
                                    data {
                                        attributes {
                                            name
                                        }
                                    }
                                }
                                course_registers {
                                    data {
                                        attributes {
                                            paymentStatus
                                        }
                                    }
                                }
                            }
                        }
                    }
                    createdAt
                    amount
                    orderId
                    currency
                    status
                }
                id
            }
            meta {
                pagination {
                    pageCount
                    pageSize
                    total
                }
            }
        }
    }
`;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useTransactionsQuery(
    baseOptions?: Apollo.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>,
) {
    return Apollo.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
}
export function useTransactionsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>,
) {
    return Apollo.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
}
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = Apollo.QueryResult<TransactionsQuery, TransactionsQueryVariables>;
export const UsersPermissionsUserDocument = gql`
    query UsersPermissionsUser($usersPermissionsUserId: ID) {
        usersPermissionsUser(id: $usersPermissionsUserId) {
            data {
                id
                attributes {
                    confirmed
                    dateOfBirth
                    email
                    firstName
                    gender
                    hasJob
                    jobTitle
                    lastName
                    phoneNumber
                    schoolName
                    studyField
                    trainerTitle
                    username
                    companyName
                    bookmarked_courses {
                        data {
                            id
                            attributes {
                                course {
                                    data {
                                        id
                                        attributes {
                                            name
                                            price
                                            duration
                                            durationType
                                            capacity
                                            count
                                            trainers {
                                                data {
                                                    id
                                                    attributes {
                                                        fullName
                                                        position
                                                        profileImage {
                                                            data {
                                                                attributes {
                                                                    url
                                                                    name
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    role {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * __useUsersPermissionsUserQuery__
 *
 * To run a query within a React component, call `useUsersPermissionsUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersPermissionsUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersPermissionsUserQuery({
 *   variables: {
 *      usersPermissionsUserId: // value for 'usersPermissionsUserId'
 *   },
 * });
 */
export function useUsersPermissionsUserQuery(
    baseOptions?: Apollo.QueryHookOptions<UsersPermissionsUserQuery, UsersPermissionsUserQueryVariables>,
) {
    return Apollo.useQuery<UsersPermissionsUserQuery, UsersPermissionsUserQueryVariables>(
        UsersPermissionsUserDocument,
        baseOptions,
    );
}
export function useUsersPermissionsUserLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<UsersPermissionsUserQuery, UsersPermissionsUserQueryVariables>,
) {
    return Apollo.useLazyQuery<UsersPermissionsUserQuery, UsersPermissionsUserQueryVariables>(
        UsersPermissionsUserDocument,
        baseOptions,
    );
}
export type UsersPermissionsUserQueryHookResult = ReturnType<typeof useUsersPermissionsUserQuery>;
export type UsersPermissionsUserLazyQueryHookResult = ReturnType<typeof useUsersPermissionsUserLazyQuery>;
export type UsersPermissionsUserQueryResult = Apollo.QueryResult<
    UsersPermissionsUserQuery,
    UsersPermissionsUserQueryVariables
>;
export const UsersPermissionsUsersDocument = gql`
    query UsersPermissionsUsers(
        $filters: UsersPermissionsUserFiltersInput
        $pagination: PaginationArg
        $sort: [String]
    ) {
        usersPermissionsUsers(filters: $filters, pagination: $pagination, sort: $sort) {
            meta {
                pagination {
                    page
                    pageCount
                    pageSize
                    total
                }
            }
            data {
                id
                attributes {
                    firstName
                    lastName
                    email
                    gender
                    dateOfBirth
                    phoneNumber
                    confirmed
                    role {
                        data {
                            attributes {
                                name
                            }
                            id
                        }
                    }
                }
            }
        }
    }
`;

/**
 * __useUsersPermissionsUsersQuery__
 *
 * To run a query within a React component, call `useUsersPermissionsUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersPermissionsUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersPermissionsUsersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useUsersPermissionsUsersQuery(
    baseOptions?: Apollo.QueryHookOptions<UsersPermissionsUsersQuery, UsersPermissionsUsersQueryVariables>,
) {
    return Apollo.useQuery<UsersPermissionsUsersQuery, UsersPermissionsUsersQueryVariables>(
        UsersPermissionsUsersDocument,
        baseOptions,
    );
}
export function useUsersPermissionsUsersLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<UsersPermissionsUsersQuery, UsersPermissionsUsersQueryVariables>,
) {
    return Apollo.useLazyQuery<UsersPermissionsUsersQuery, UsersPermissionsUsersQueryVariables>(
        UsersPermissionsUsersDocument,
        baseOptions,
    );
}
export type UsersPermissionsUsersQueryHookResult = ReturnType<typeof useUsersPermissionsUsersQuery>;
export type UsersPermissionsUsersLazyQueryHookResult = ReturnType<typeof useUsersPermissionsUsersLazyQuery>;
export type UsersPermissionsUsersQueryResult = Apollo.QueryResult<
    UsersPermissionsUsersQuery,
    UsersPermissionsUsersQueryVariables
>;
export const UsersPermissionsRolesDocument = gql`
    query UsersPermissionsRoles {
        usersPermissionsRoles {
            data {
                id
                attributes {
                    name
                }
            }
        }
    }
`;

/**
 * __useUsersPermissionsRolesQuery__
 *
 * To run a query within a React component, call `useUsersPermissionsRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersPermissionsRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersPermissionsRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersPermissionsRolesQuery(
    baseOptions?: Apollo.QueryHookOptions<UsersPermissionsRolesQuery, UsersPermissionsRolesQueryVariables>,
) {
    return Apollo.useQuery<UsersPermissionsRolesQuery, UsersPermissionsRolesQueryVariables>(
        UsersPermissionsRolesDocument,
        baseOptions,
    );
}
export function useUsersPermissionsRolesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<UsersPermissionsRolesQuery, UsersPermissionsRolesQueryVariables>,
) {
    return Apollo.useLazyQuery<UsersPermissionsRolesQuery, UsersPermissionsRolesQueryVariables>(
        UsersPermissionsRolesDocument,
        baseOptions,
    );
}
export type UsersPermissionsRolesQueryHookResult = ReturnType<typeof useUsersPermissionsRolesQuery>;
export type UsersPermissionsRolesLazyQueryHookResult = ReturnType<typeof useUsersPermissionsRolesLazyQuery>;
export type UsersPermissionsRolesQueryResult = Apollo.QueryResult<
    UsersPermissionsRolesQuery,
    UsersPermissionsRolesQueryVariables
>;
export const VideoByAdminDocument = gql`
    query VideoByAdmin($videoId: ID) {
        video(id: $videoId) {
            data {
                id
                attributes {
                    body
                    category
                    coverImage {
                        data {
                            id
                            attributes {
                                name
                                url
                            }
                        }
                    }
                    createdAt
                    slug
                    status
                    title
                    videoId
                    viewCount
                }
            }
        }
    }
`;

/**
 * __useVideoByAdminQuery__
 *
 * To run a query within a React component, call `useVideoByAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoByAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoByAdminQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useVideoByAdminQuery(
    baseOptions?: Apollo.QueryHookOptions<VideoByAdminQuery, VideoByAdminQueryVariables>,
) {
    return Apollo.useQuery<VideoByAdminQuery, VideoByAdminQueryVariables>(VideoByAdminDocument, baseOptions);
}
export function useVideoByAdminLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<VideoByAdminQuery, VideoByAdminQueryVariables>,
) {
    return Apollo.useLazyQuery<VideoByAdminQuery, VideoByAdminQueryVariables>(VideoByAdminDocument, baseOptions);
}
export type VideoByAdminQueryHookResult = ReturnType<typeof useVideoByAdminQuery>;
export type VideoByAdminLazyQueryHookResult = ReturnType<typeof useVideoByAdminLazyQuery>;
export type VideoByAdminQueryResult = Apollo.QueryResult<VideoByAdminQuery, VideoByAdminQueryVariables>;
export const MeDocument = gql`
    query Me {
        me {
            id
            username
            email
            confirmed
            blocked
            role {
                id
                name
                description
                type
            }
            lastName
            firstName
            phoneNumber
            gender
            dateOfBirth
            companyName
            schoolName
            hasJob
            jobTitle
            studyField
        }
    }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const VideoDocument = gql`
    query Video($filters: VideoFiltersInput) {
        videos(filters: $filters) {
            data {
                id
                attributes {
                    title
                    body
                    coverImage {
                        data {
                            attributes {
                                url
                            }
                            id
                        }
                    }
                    slug
                    category
                    videoId
                    createdAt
                }
            }
        }
    }
`;

/**
 * __useVideoQuery__
 *
 * To run a query within a React component, call `useVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useVideoQuery(baseOptions?: Apollo.QueryHookOptions<VideoQuery, VideoQueryVariables>) {
    return Apollo.useQuery<VideoQuery, VideoQueryVariables>(VideoDocument, baseOptions);
}
export function useVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoQuery, VideoQueryVariables>) {
    return Apollo.useLazyQuery<VideoQuery, VideoQueryVariables>(VideoDocument, baseOptions);
}
export type VideoQueryHookResult = ReturnType<typeof useVideoQuery>;
export type VideoLazyQueryHookResult = ReturnType<typeof useVideoLazyQuery>;
export type VideoQueryResult = Apollo.QueryResult<VideoQuery, VideoQueryVariables>;
export const VideosDocument = gql`
    query Videos($pagination: PaginationArg, $sort: [String], $filters: VideoFiltersInput) {
        videos(pagination: $pagination, sort: $sort, filters: $filters) {
            data {
                id
                attributes {
                    title
                    body
                    coverImage {
                        data {
                            attributes {
                                url
                            }
                            id
                        }
                    }
                    slug
                    status
                    category
                    createdAt
                }
            }
            meta {
                pagination {
                    pageCount
                    total
                    pageSize
                    page
                }
            }
        }
    }
`;

/**
 * __useVideosQuery__
 *
 * To run a query within a React component, call `useVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideosQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useVideosQuery(baseOptions?: Apollo.QueryHookOptions<VideosQuery, VideosQueryVariables>) {
    return Apollo.useQuery<VideosQuery, VideosQueryVariables>(VideosDocument, baseOptions);
}
export function useVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideosQuery, VideosQueryVariables>) {
    return Apollo.useLazyQuery<VideosQuery, VideosQueryVariables>(VideosDocument, baseOptions);
}
export type VideosQueryHookResult = ReturnType<typeof useVideosQuery>;
export type VideosLazyQueryHookResult = ReturnType<typeof useVideosLazyQuery>;
export type VideosQueryResult = Apollo.QueryResult<VideosQuery, VideosQueryVariables>;
