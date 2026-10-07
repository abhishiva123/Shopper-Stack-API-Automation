import { test, expect } from '../../src/fixtures/api.fixture';
import { STATUS_CODES } from '../../src/config/status-codes';

test('Get available banks', async ({
    bankService
}) => {

    const banksResponse =
        await bankService.getAllBanks();

    expect(
        banksResponse.response.status()
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        banksResponse.body.statusCode
    ).toBe(
        STATUS_CODES.OK
    );

    expect(
        banksResponse.body.data
    ).toBeTruthy();

    expect(
        Array.isArray(
            banksResponse.body.data
        )
    ).toBe(true);
});