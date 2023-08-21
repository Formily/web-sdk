export enum AnswerType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
  TEXT = 'text',
  DATE = 'date',
  CSAT = 'csat',
  SMILEY_SCALE = 'smiley_scale',
  NUMERICAL_SCALE = 'numerical_scale',
  RATING = 'rating',
  NPS = 'nps',
  FORM = 'form',
  CTA = 'cta',
}

export enum FormFieldType {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  EMAIL = 'email',
  ORGANIZATION = 'organization',
  DEPARTMENT = 'department',
  JOB_TITLE = 'job_title',
  PHONE = 'phone',
  WEBSITE = 'website',
  COUNTRY = 'country',
  ADDRESS_ONE = 'address_one',
  ADDRESS_TWO = 'address_two',
  CITY = 'city',
  STATE = 'state',
  ZIP = 'zip',
  FAX = 'fax',
  ANNUAL_REVENUE = 'annual_revenue',
  EMPLOYEES = 'employees',
  INDUSTRY = 'industry',
  CONFIRMATION = 'confirmation',
  SECURITY_INFO = 'security_info',
}

export enum LogicOperator {
  OR = 'or',
  AND = 'and',
}

export enum LogicFormCondition {
  IS_FILLED_IN = 'filled',
  IS_NOT_FILLED_IN = 'not_filled',
  HAS_ANY_VALUE = 'any_value',
}

export enum LogicRangeCondition {
  IS = 'is',
  IS_NOT = 'is_not',
  IS_BETWEEN = 'between',
  HAS_ANY_VALUE = 'any_value',
}

export enum LogicDateCondition {
  HAS_ANY_VALUE = 'any_value',
  QUESTION_IS_ANSWERED = 'answered',
  QUESTION_IS_NOT_ANSWERED = 'not_answered',
}

export enum LogicMultipleCondition {
  IS_EXACTLY = 'exactly',
  INCLUDES_ALL = 'includes_all',
  INCLUDES_ANY = 'includes_any',
  DOES_NOT_INCLUDE_ANY = 'not_include_any',
  HAS_ANY_VALUE = 'any_value',
}

export enum LogicTextCondition {
  ANSWER_CONTAINS = 'contains',
  ANSWER_DOES_NOT_CONTAIN = 'not_contain',
  HAS_ANY_VALUE = 'any_value',
  QUESTION_IS_ANSWERED = 'answered',
  QUESTION_IS_NOT_ANSWERED = 'not_answered',
}

export enum LogicSingleCondition {
  IS = 'is',
  IS_NOT = 'is_not',
  HAS_ANY_VALUE = 'any_value',
}

export enum CTAType {
  LINK = 'link',
  NEXT = 'next',
  CLOSE = 'close',
  HIDDEN = 'hidden',
}

export type PlacementType =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight'
  | 'center';

export type ID = string | number;

export interface SurveyAnswer {
  type: AnswerType;
  id?: ID;
  ids?: ID[];
  value?: string;
}

export interface QuestionAnswer {
  finished?: boolean;
  ctaSuccess?: boolean;
  content?: string;
  questionAnswerId?: number;
  type?: AnswerType;
  completionRate: number;
  answer: string;
  answerId: number;
}

export interface QuestionOption {
  id: ID;
  orderNumber: number;
  label: string;
}

export interface FormField extends QuestionOption {
  type: FormFieldType;
  required: boolean;
}

export interface QuestionLogic {
  id?: ID;
  orderNumber?: number;
  goTo: string | number;
}

export interface FormLogic extends QuestionLogic {
  operator: LogicOperator;
  groups: {
    condition: LogicFormCondition;
    operator: LogicOperator;
    fields: ID[];
  }[];
}

export interface RangeLogic extends QuestionLogic {
  condition: LogicRangeCondition;
  operator: LogicOperator;
  values: number[];
}

export interface FormSettings {
  disclaimer?: boolean;
  disclaimerText?: string;
  consent?: boolean;
  consentText?: string;
  logic?: FormLogic[];
}

export interface RangeSettings {
  rightText?: string;
  leftText?: string;
  logic?: RangeLogic[];
  shape?: 'star' | 'thumb' | 'heart';
}

export interface CTASettings {
  type: CTAType;
  text?: string;
  link?: boolean;
}

export interface DateSettings {
  logic?: (QuestionLogic & {
    condition: LogicDateCondition;
    operator: LogicOperator;
    values: string[];
  })[];
}

export interface MultipleSettings {
  randomizeAnswer?: boolean;
  logic?: (QuestionLogic & {
    condition: LogicMultipleCondition;
    operator: LogicOperator;
    values: ID[];
  })[];
}

export interface SingleSettings {
  randomizeAnswer?: boolean;
  logic?: (QuestionLogic & {
    condition: LogicSingleCondition;
    operator: LogicOperator;
    values: ID[];
  })[];
}

export interface TextSettings {
  logic?: (QuestionLogic & {
    condition: LogicTextCondition;
    operator: LogicOperator;
    values: string[];
  })[];
}

export interface Question {
  id: string | number;
  label: string;
  description?: string;
  type: ResponseType;
  options?: (QuestionOption | FormField)[];
  maxPath: number;
  settings:
    | FormSettings
    | RangeSettings
    | CTASettings
    | DateSettings
    | MultipleSettings
    | SingleSettings
    | TextSettings;
}

export interface Trigger {
  delay?: number;
  conditions?: {
    event: string;
    filters?: {
      property: string;
      operator: string;
      value: number | boolean | string | string[];
    }[];
  }[];
}

export interface Audience {
  operator: LogicOperator;
  filters: {
    attribute: string;
    operator: string;
    value: number | boolean | string | string[];
  }[];
}

export interface SurveySettings {
  recurring: boolean;
  recurringPeriod: number;
  placement?: PlacementType;
  showProgressBar: boolean;
  submitText?: string;
}

export interface Theme {
  question?: string;
  answer?: string;
  button?: string;
  background?: string;
  progressBar?: string;
}

export interface Survey {
  id: string;
  name?: string;
  type: string;
  questions: Question[];
  trigger?: Trigger;
  audience?: Audience[];
  settings: SurveySettings;
  theme?: Theme;
  answeredCount?: number;
}

export type Jsonish =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Jsonish }
  | { toJSON: () => any }
  | Jsonish[]
  | undefined;

export interface UserAttributes {
  [key: string]: Jsonish;
}

export interface EventProperties {
  [key: string]: Jsonish;
}

export interface State {
  surveys?: Survey[];
  person: {
    id: ID;
    attributes: UserAttributes;
  };
}

export interface Configuration {
  apiHost?: string;
  appKey?: string;
  surveys?: Survey[];
  debug?: boolean;
}
