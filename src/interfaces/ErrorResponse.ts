import MessageResponse from './ProductResponse';

export default interface ErrorResponse extends MessageResponse {
  stack?: string;
}
