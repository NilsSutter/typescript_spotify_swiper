export class Success {
	value: any

	constructor(value: any) {
		this.value = value
	}
}

export class Failure {
	failureReason: any

	constructor(failureReason: any) {
		this.failureReason = failureReason
	}
}

export abstract class UseCase {
	abstract perform(...args: any[]): Success | Failure

	success(value: any): Success  {
		return new Success(value)
	}

	failure(reason: string): Failure {
		return new Failure(reason)
	}
}
