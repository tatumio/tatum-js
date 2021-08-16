/**
 * Usage information of credits
 */
export interface Consumption {
    /**
     * UTC millis timestamp of the day.
     */
    day: number

    /**
     * Number of credits consumed for the specific day.
     */
    usage: number
}